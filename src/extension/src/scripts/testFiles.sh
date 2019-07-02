#!/usr/bin/env 
set -e
cd ../../src/template_test

ls

cd Flask_Angular
cd Flask_Angular
pwd
yarn install || exit 1
yarn start

# for f in *; do
#   cd $f 
#   cd $f
#   pwd
#   yarn install
#   yarn start
#   cd ../..
# done