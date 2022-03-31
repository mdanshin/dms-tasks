#!/bin/bash
cd ..
docker stop dms-tasks-dev
docker rm dms-tasks-dev
# docker system prune -a

docker build -t dms-tasks:dev .

docker run -d --name dms-tasks-dev \
--restart always \
--expose=5000 -p 80:80 -p 5000:5000 \
-e PORT=5000 -e REACT_APP_API_URL=http://localhost:5000/api \
-v ~/dms-tasks/db:/data/db/ \
dms-tasks:dev
