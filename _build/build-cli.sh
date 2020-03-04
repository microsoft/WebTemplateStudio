#!/bin/bash

# This script builds the cli as a selfconatined executable and copies the output to the extensions corets-cli folders for mac, linux and windows

if [ ! -z "$1" ] && ([ "$1" == "release" ] || [ "$1" == "debug" ]); then # Check if release was passed as parameter, else ignore it
	configuration=$1

    echo "Building and publishing cli in configuration $configuration"
    echo

    dotnet publish ../src/CoreTemplateStudio/code/src/CoreTemplateStudio/CoreTemplateStudio.Cli/CoreTemplateStudio.Cli.csproj -c $configuration -r win-x64 --self-contained true -p:PublishSingleFile=true -o ../src/extension/src/corets-cli/win32/
    dotnet publish ../src/CoreTemplateStudio/code/src/CoreTemplateStudio/CoreTemplateStudio.Cli/CoreTemplateStudio.Cli.csproj -c $configuration -r linux-x64 --self-contained true -p:PublishSingleFile=true -o ../src/extension/src/corets-cli/linux/
    dotnet publish ../src/CoreTemplateStudio/code/src/CoreTemplateStudio/CoreTemplateStudio.Cli/CoreTemplateStudio.Cli.csproj -c $configuration -r osx-x64 --self-contained true -p:PublishSingleFile=true -o ../src/extension/src/corets-cli/darwin/

    echo "Finished building the cli"

else
    echo "Invalid parmeter $1, expected values: 'debug' or ' release' for build configuration."
fi





