#!/bin/bash
set -e -o pipefail

echo '*********************'
echo '*** Before Deploy ***'
echo '*********************'

#Set environment variables
echo 'TRAVIS_BUILD :'TRAVIS_BUILD
echo '$TRAVIS_BUILD :'$TRAVIS_BUILD
echo '$AZURE_WA_USERNAME: '$AZURE_WA_USERNAME
