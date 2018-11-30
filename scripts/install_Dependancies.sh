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
    echo Installing dependancies for Linux

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
