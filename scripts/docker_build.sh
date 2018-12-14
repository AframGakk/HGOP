#!/bin/bash

GIT_COMMIT=$1

cd game-api
docker build -t villirn/hgop:$GIT_COMMIT .
cd ../game-client
docker build -t villirn/hgopui:$GIT_COMMIT .

