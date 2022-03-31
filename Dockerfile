###FOR DEV###
# docker stop dms-tasks; docker rm dms-tasks; docker system prune -a; docker build -t dms-tasks:dev .

###FOR PROD###
# docker stop dms-tasks; docker rm dms-tasks; docker system prune -a; docker build -t mdanshin/dms-tasks:0.1.0 -t mdanshin/dms-tasks:latest .

###FOR PUB###
# docker tag dms-tasks:latest mdanshin/dms-tasks:latest
# docker tag dms-tasks:latest mdanshin/dms-tasks:0.1.0
# docker push mdanshin/dms-tasks:0.1.0
# docker push mdanshin/dms-tasks:latest

########## STAGE 1 ##########
##      Build frontend     ##
#############################
FROM node as builder

ENV REACT_APP_API_URL=http://localhost:5000/api

WORKDIR /dms-tasks-client

COPY ./client/package.json /dms-tasks-client/

RUN npm install

COPY ./client .

RUN npm run build

########## STAGE 2 ##########
##     Build backend      ##
#############################
FROM alpine:3.11

ENV PORT=5000
ENV CLIENT_URL=http://localhost
ENV mongoUri=mongodb://localhost:27017/dms-tasks

WORKDIR /usr/share/nginx/html

COPY ./server/package.json /dms-task-server/
COPY --from=builder /dms-tasks-client/build .
COPY ./deploy/nginx/default.conf /etc/nginx/http.d/default.conf
COPY ./deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./server /dms-task-server/
COPY ./deploy/start.sh /

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories && \
    echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories && \
    apk -U add nginx nodejs npm mongodb && \
    mkdir -p /data/db/ && \
    mkdir -p /run/nginx/ && \
    chmod +x /start.sh && \
    npm install --prefix /dms-task-server

EXPOSE 80 5000

CMD ["/bin/sh", "/start.sh"]

# docker run -d --name dms-tasks --restart always --expose=5000 -p 80:80 -p 5000:5000 -e PORT=5000 -e REACT_APP_API_URL=http://localhost:5000/api -v ~/dms-tasks/db:/data/db/ dms-tasks:dev
# docker run -d --restart always --name dms-tasks -p 80:80 -p 5000:5000 -v ~/dms-tasks/db:/data/db/ dms-tasks:latest