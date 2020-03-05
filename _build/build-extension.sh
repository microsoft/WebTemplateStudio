#!/bin/bash

# This script installs extension dependencies and builds the extension

magenta='\033[0;35m'
red='\033[0;31m'
nc='\033[0m'

echo -e "${magenta}Installing extension dependencies ${nc}"
echo
yarn --cwd ../src/extension install
echo

echo -e "${magenta}Building extension ${nc}"
echo
yarn --cwd ../src/extension build


