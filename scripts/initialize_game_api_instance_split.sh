#!/bin/bash

echo 'This script installs everything needed to run our API on the instance'
echo 'and then starts the API.'

# If is mac
if uname = "Darwin"; then
    echo 'Running script for OSX on darwin kernel'
    echo 'Installing Docker'

    sleep 3
    exit 1

else if uname = "Linux"; then
    echo 'Running scripts for linux on kernel'
    echo 'Installing Docker'

    sudo apt-get update
    sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce
    sudo usermod -aG docker ubuntu

else
    echo 'Are you serously using windows?'
    sleep 1
    echo '.'
    sleep 1
    echo '.'
    sleep 1
    echo '.'
    echo 'shutting down...'
    sleep 1
    exit 1
fi

echo 'Install Docker Compose'
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# TODO exit 1 if there is no docker-compose.yml file present.

echo 'Starting the API'
sudo docker-compose up -d
