#!/usr/bin/env bash

# install Git
if ! type git > /dev/null; then
    echo Installing Git
    sudo apt-get install git
fi

# install AWS Client
if ! type aws > /dev/null; then
    echo Installing AWS Client
    sudo apt-get update
    sudo apt-get install python3
    sudo apt-get install python3-pip
    sudo apt install awscli
fi

# install Docker
if ! type docker > /dev/null; then
    echo Installing docker
    sudo apt-get update
    sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo apt-key fingerprint 0EBFCD88
    sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
    sudo apt-get update
    sudo apt-get install docker-ce
fi

# install node
if ! type nodejs > /dev/null; then
    curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# install Terraform
if ! type terraform > /dev/null; then
    echo Installing Terraform
    #install unzip
    sudo apt-get install unzip
    wget https://releases.hashicorp.com/terraform/0.11.10/terraform_0.11.10_linux_amd64.zip
    unzip terraform_0.11.10_linux_amd64.zip
    rm terraform_0.11.10_linux_amd64.zip
    sudo mv terraform /usr/local/bin/
fi

# install yarn
if ! type yarn > /dev/null; then
    echo Installing yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get install yarn
fi

