#!/bin/bash

# This script builds the cli as a selfconatined executable and copies the output to the extensions corets-cli folders for mac, linux and windows

magenta='\033[0;35m'
red='\033[0;31m'
nc='\033[0m'

if [ ! -z "$1" ] && ([ "$1" == "release" ] || [ "$1" == "debug" ]); then # Check if release was passed as parameter, else ignore it
	configuration=$1

    echo -e "${magenta}Building and publishing cli in configuration $configuration ${nc}"
    echo

    dotnet publish ../src/CoreTemplateStudio/code/src/CoreTemplateStudio/CoreTemplateStudio.Cli/CoreTemplateStudio.Cli.csproj -c $configuration -r win-x64 --self-contained true -o ../src/extension/src/corets-cli/win32/
    dotnet publish ../src/CoreTemplateStudio/code/src/CoreTemplateStudio/CoreTemplateStudio.Cli/CoreTemplateStudio.Cli.csproj -c $configuration -r linux-x64 --self-contained true -o ../src/extension/src/corets-cli/linux/
    dotnet publish ../src/CoreTemplateStudio/code/src/CoreTemplateStudio/CoreTemplateStudio.Cli/CoreTemplateStudio.Cli.csproj -c $configuration -r osx-x64 --self-contained true -o ../src/extension/src/corets-cli/darwin/


    echo -e "${magenta}Copy config file $configuration ${nc}"
    cp -v CoreTemplateStudio.local.$configuration.config.json ../src/extension/src/corets-cli/win32/CoreTemplateStudio.config.json
    cp -v CoreTemplateStudio.local.$configuration.config.json ../src/extension/src/corets-cli/linux/CoreTemplateStudio.config.json
    cp -v CoreTemplateStudio.local.$configuration.config.json ../src/extension/src/corets-cli/darwin/CoreTemplateStudio.config.json
else
    echo -e "${red}Invalid parmeter $1, expected values: 'debug' or ' release' for build configuration.${nc}"
fi





