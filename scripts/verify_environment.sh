#!/bin/bash
if ! -f ./logs.log; then
    touch ./logs.log
fi

# the path of THIS script file
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

allInstalled=true

# A welcome message
echo Welcome to HGOP $USER

# Start date
echo Info script started at $(date '+%d/%m/%Y %H:%M:%S');

echo These are some information about versions and distributions on your computer.
echo ""

# The distro and kernel information
echo "-- Operating System --"
echo "Kernel Distro: " $(uname -s)
echo "Kernel version: " $(uname -v)
echo ""

# Check for git
gitPresent="NOT INSTALLED"
if ! type git > /dev/null; then
    allInstalled=false
else
    gitPresent=$(git --version)
fi
echo -e "Git Installation:\t\t"$gitPresent

# Check for NPM
npmPresent="NOT INSTALLED"
if ! type npm > /dev/null; then
    allInstalled=false
else
    npmPresent=$(npm --version)
fi
echo -e "NPM Installation:\t\t"$npmPresent

# Check for NodeJS
nodePresent="NOT INSTALLED"
if ! type node > /dev/null; then
    allInstalled=false
else
    nodePresent=$(node --version)
fi
echo -e "NodeJS Installation:\t\t"$nodePresent

# Check for AWS Cli
awsPresent="NOT INSTALLED"
if ! type aws > /dev/null; then
  allInstalled=false
else
    awsPresent=$(aws --version)
fi
echo -e "AWS Installation:\t\t"$awsPresent

# Check for Terraform
terraformPresent="NOT INSTALLED"
if ! type terraform > /dev/null; then
    allInstalled=false
else
    terraformPresent=$(terraform --version)
fi
echo -e "Terraform Installation:\t\t"$terraformPresent

# Check for Docker
dockerPresent="NOT INSTALLED"
if ! type docker > /dev/null; then
    allInstalled=false
else
    dockerPresent=$(docker -v)
fi
echo -e "Docker Installation:\t\t"$dockerPresent

echo ""

# If there are some dependancies missing then ask to install.
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
