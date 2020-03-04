#!/bin/bash
echo "Building client"
echo
sh ./build-client.sh

echo "Building cli"
echo
sh ./build-cli.sh "debug"
