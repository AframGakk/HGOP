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

    # getting NVM
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

    # install Git
    if ! type git > /dev/null; then
        echo Installing Git
        sudo apt-get install git
    fi

    # install node
    if ! type npm > /dev/null; then
        echo Installing NodeJs and NPM
        nvm install node
    fi

    # install Docker
    if ! type docker > /dev/null; then
        echo Installing docker
        sudo apt-get install docker-ce
    fi

    # install Terraform
    if ! type terraform > /dev/null; then
        echo Installing Terraform
        #install unzip
        sudo apt-get install unzip
        wget https://releases.hashicorp.com/terraform/0.11.10/terraform_0.11.10_linux_amd64.zip
        cd ~/Downloads
        unzip terraform_0.11.10_linux_amd64.zip
        sudo mv terraform /usr/local/bin/
    fi

    # install AWS Client
    if ! type aws > /dev/null; then
      #if you're missing only aws
      echo Installing AWS Client
      pip install awscli --upgrade --user
      if ! type pip > /dev/null; then
        #if you´re missing pip and aws
        echo Installing AWS Client
        curl -O https://bootstrap.pypa.io/get-pip.py
        python get-pip.py --user
        if ! type python3 > /dev/null; then
          #if you´re missing python,pip and aws
          echo Installing AWS Client
          sudo apt-get install python3
          curl -O https://bootstrap.pypa.io/get-pip.py
          python get-pip.py --user
          pip install awscli --upgrade --user
        fi
      fi
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
