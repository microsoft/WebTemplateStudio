#!/bin/bash

# This script builds the client, the cli (in release) and the extension and generates a vsix
magenta='\033[0;35m'
red='\033[0;31m'
nc='\033[0m'

# Build the client
sh ./build-client.sh

# Build the cli in release
sh ./build-coretscli.sh "release"

# Create vsix package
echo -e "${magenta}Creating vsix package ${nc}"
echo
yarn --cwd ../src/extension createVsixPackage && echo -e "${magenta}vsix file is now available in root/dist/ ${nc}"
