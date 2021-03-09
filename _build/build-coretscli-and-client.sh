#!/bin/bash

# This script installs and builds the client and cli and copies the output to the extensions folder

magenta='\033[0;35m'
red='\033[0;31m'
nc='\033[0m'

BASEDIR=$(dirname "$0")
cd $BASEDIR

# Build the client
bash ./build-client.sh

# Build the cli in debug
bash ./build-coretscli.sh "debug"
