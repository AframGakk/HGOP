#!/bin/bash

GIT_COMMIT=$1

docker push villirn/hgop:$GIT_COMMIT
docker push villirn/hgopui:$GIT_COMMIT

