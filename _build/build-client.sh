#!/bin/bash

# This script installs client dependencies and builds the client and copies the output to the extensions react folder

magenta='\033[0;35m'
red='\033[0;31m'
nc='\033[0m'

BASEDIR=$(dirname "$0")
cd $BASEDIR

echo -e "${magenta}Installing client dependencies ${nc}"
echo
yarn --cwd ../src/client install
echo

echo -e "${magenta}Building client ${nc}"
echo
yarn --cwd ../src/client build


