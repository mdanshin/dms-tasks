#!/bin/bash
IMAGE_NAME="dms-tasks"
CONTAINER_NAME="dms-tasks"

DB_PATH=~/dms-tasks/db

BASE_URL="http://localhost"
API="api"

SITE_PORT=80
API_PORT=5000

cd ..
docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}
# docker system prune -a

docker build --build-arg REACT_APP_API_URL="${BASE_URL}:${API_PORT}/${API}" \
-t ${IMAGE_NAME} .

docker run -d --name ${CONTAINER_NAME} \
--restart always \
--expose=${API_PORT} -p ${SITE_PORT}:${SITE_PORT} -p ${API_PORT}:${API_PORT} \
-e PORT=${API_PORT} \
-e REACT_APP_API_URL="${BASE_URL}:${API_PORT}/${API}" \
-e CLIENT_URL=${BASE_URL} \
-v $DB_PATH:/data/db/ \
${IMAGE_NAME}
