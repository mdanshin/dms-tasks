#!/bin/sh
nginx &
mongod &
npm run start --prefix /dms-task-server
