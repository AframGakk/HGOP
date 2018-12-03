#!/bin/bash

unameOut="$(uname -s)"

# Check if linux or mac
if [ $unameOut = "Darwin" ]
then
    echo Installing dependancies for OSX

    # install homebrew
    echo Installing homebrew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    # install Git
    if ! type git > /dev/null; then
        echo Installing Git
        brew install git
    fi

    # install NPM
    if ! type npm > /dev/null; then
        echo Installing node and NPM
        brew install node
    fi

    # install Docker
    if ! type docker > /dev/null; then
        echo Installing docker
        brew install docker
    fi

    # install Terraform
    if ! type terraform > /dev/null; then
        echo Installing Terraform
        brew install terraform
    fi

    # install AWS Client
    if ! type aws > /dev/null; then
        echo Installing AWS Client
        brew install aws
    fi

elif [ $unameOut = "Linux" ]
then
    echo Installing dependancies for Linux/Ubuntu

    # install Git
    if ! type git > /dev/null; then
        echo Installing Git
        sudo apt-get install git
    fi

    # install node
    if ! type nodejs > /dev/null; then
        curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
        sudo apt-get install -y nodejs
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
        sudo apt-get install docker-compose
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

    # install AWS Client
    if ! type aws > /dev/null; then
      echo Installing AWS Client
      sudo apt-get update
      sudo apt-get install python3
      sudo apt-get install python3-pip
      sudo apt install awscli
    fi
else
  echo -n Windows Really!?
  sleep 1
  echo -n .
  sleep 1
  echo -n .
  sleep 1
  echo .
  echo Shutting down...
  sleep 1
fi
