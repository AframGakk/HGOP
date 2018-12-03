#!/bin/bash

GIT_COMMIT=$1

cd itemrepository
docker build -t username/repo:$GIT_COMMIT .

# TODO exit on error if any command fails
