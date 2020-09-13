#!/bin/bash
PROJECTPATH="$(dirname $(dirname $(dirname $(realpath $0))))"
PUBLISHPATH="$PROJECTPATH/publish"
BACKENDPATH="$PROJECTPATH/backend"

echo "Remove old publish backend"
for dir in $PUBLISHPATH/*; do
    [[ "$dir" == */build ]] && continue
    rm -rf "$dir"
done

echo "$(cd $PROJECTPATH/..; pwd)"

#echo "Execute clean command"
dotnet clean $BACKENDPATH /property:GenerateFullPaths=true /consoleloggerparameters:NoSummary

#echo "Execute publish command"
dotnet publish $BACKENDPATH -c Release -o $PUBLISHPATH /property:GenerateFullPaths=true /consoleloggerparameters:NoSummary

echo "Finished"