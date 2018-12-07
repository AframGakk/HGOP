#!/bin/bash

# exit if any command returns a non-zero exit code
set -e

GIT_COMMIT=$1

docker push villirn/hgop:$GIT_COMMIT

