#!/bin/bash

# This script installs and builds the client and cli and copies the output to the extensions folder

magenta='\033[0;35m'
red='\033[0;31m'
nc='\033[0m'

# Build the client
sh ./build-client.sh

# Build the cli in debug
sh ./build-coretscli.sh "debug"

# Build the extension 
sh ./build-extension.sh