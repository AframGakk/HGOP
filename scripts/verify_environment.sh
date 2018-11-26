#!/bin/bash
if ! -f ./logs.log; then
    touch ./logs.log
fi

# A welcome message
echo Welcome to HGOP $USER
echo These are some information about versions and distributions on your computer.

# The distro and kernel information
uname -a

# Start date
echo Info script started at $(date '+%d/%m/%Y %H:%M:%S');

# Check for git
gitPresent="Not Installed"
if ! type git > /dev/null; then
  echo Git not found, please install;
else
    gitPresent=$(git --version)
    echo Git found at version: $gitPresent;
fi

# Check for NPM
npmPresent="Not Installed"
if ! type npm > /dev/null; then
  echo NPM not found, please install
else
    npmPresent=$(npm --version)
    echo NPM found at version: $npmPresent;
fi

# Check for NodeJS
nodePresent="Not Installed"
if ! type node > /dev/null; then
  echo NodeJS not found, please install
else
    nodePresent=$(node --version)
    echo NodeJS found at version: $nodePresent;
fi

# Logging at end
echo [$(date '+%d/%m/%Y %H:%M:%S')] : $USER - Distro: $(uname), Git: $gitPresent, NPM: $npmPresent, NodeJS: $nodePresent >> ./logs.log 2>&1

# End date
echo Info script ended at $(date '+%d/%m/%Y %H:%M:%S');
