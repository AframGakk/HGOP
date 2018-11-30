#!/bin/bash
if ! -f ./logs.log; then
    touch ./logs.log
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
allInstalled=true

# A welcome message
echo Welcome to HGOP $USER
echo These are some information about versions and distributions on your computer.

# The distro and kernel information
uname -a

# Start date
echo Info script started at $(date '+%d/%m/%Y %H:%M:%S');

# Check for git
gitPresent="NOT INSTALLED"
if ! type git > /dev/null; then
  echo Git not found, please install;
  allInstalled=false
else
    gitPresent=$(git --version)
    echo Git found at version: $gitPresent;
fi

# Check for NPM
npmPresent="NOT INSTALLED"
if ! type npm > /dev/null; then
  echo NPM not found, please install
  allInstalled=false
else
    npmPresent=$(npm --version)
    echo NPM found at version: $npmPresent;
fi

# Check for NodeJS
nodePresent="NOT INSTALLED"
if ! type node > /dev/null; then
  echo NodeJS not found, please install
  allInstalled=false
else
    nodePresent=$(node --version)
    echo NodeJS found at version: $nodePresent;
fi

# Check for AWS Cli
awsPresent="NOT INSTALLED"
if ! type aws > /dev/null; then
  echo AWSCli not found, please install
  allInstalled=false
else
    awsPresent=$(aws --version)
    echo AWSCli found at version: $awsPresent;
fi

# Check for Terraform
terraformPresent="NOT INSTALLED"
if ! type terraform > /dev/null; then
  echo Terraform not found, please install
else
    terraformPresent=$(terraform --version)
    echo Terraform found at version: $terraformPresent;
fi

# Check for Docker
dockerPresent="NOT INSTALLED"
if ! type docker > /dev/null; then
  echo Docker not found, please install
  allInstalled=false
else
    dockerPresent=$(docker -v)
    echo Docker found at version: $dockerPresent;
fi

if [ "$allInstalled" = false ]; then
    echo "There are some missing dependancies. Would you like to install them? (yes/no)"
    read installCond
    if [ $installCond = yes ]; then
        installFileDIR=$DIR"/install_Dependancies.sh"
        $installFileDIR
    fi
fi

# Logging at end
echo [$(date '+%d/%m/%Y %H:%M:%S')] : $USER - Distro: $(uname) >> ./logs.log 2>&1
echo Git: $gitPresent >> ./logs.log 2>&1
echo NPM: $npmPresent >> ./logs.log 2>&1
echo NodeJS: $nodePresent >> ./logs.log 2>&1
echo AWSCli: $awsPresent >> ./logs.log 2>&1
echo Terraform: $terraformPresent >> ./logs.log 2>&1
echo Docker: $dockerPresent >> ./logs.log 2>&1
echo "" >> ./logs.log 2>&1

# End date
echo Info script ended at $(date '+%d/%m/%Y %H:%M:%S');
