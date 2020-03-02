#!/bin/bash

# This script installs and builds the client and copies the output to the extensions react folder

echo "Installing client dependencies"
echo
yarn --cwd ../src/client install
echo

echo "Building client"
echo
yarn --cwd ../src/client build

echo "Finished building the client"

read
