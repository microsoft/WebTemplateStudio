#!/bin/bash

# This script installs and builds the extension

echo "Installing extension dependencies"
echo
yarn --cwd ../src/extension install
echo

echo "Building extension"
echo
yarn --cwd ../src/extension build

echo "Finished building extension"

