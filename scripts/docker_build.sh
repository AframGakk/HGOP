#!/bin/bash

GIT_COMMIT=$1

cd game-api
sudo docker build -t villirn/hgop:$GIT_COMMIT .

# TODO exit on error if any command fails
