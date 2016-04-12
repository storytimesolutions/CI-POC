#!/bin/bash
set -ev

echo '*********************'
echo '*** Before Deploy ***'
echo '*********************'

#Set environment variables
echo "TRAVIS_BRANCH is $TRAVIS_BRANCH"
echo "AZURE_WA_USERNAME is $AZURE_WA_USERNAME"

SITE=""
BRANCH=""

if [[ "$TRAVIS_BRANCH" = "master" ]]; then
    SITE=$AZURE_WA_SITE_PROD
    BRANCH="master"
elif [[ "$TRAVIS_BRANCH" = "dev" ]]; then
    SITE=$AZURE_WA_SITE_DEV
    BRANCH="dev"
fi

echo "Branch is "BRANCH

export azure_username=$AZURE_WA_USERNAME
export azure_password=$AZURE_WA_PASSWORD
export azure_site=SITE
export azure_on_branch=BRANCH

echo 'azure_username: '$azure_username
echo 'azure_password: '$azure_password
echo 'azure_site: '$azure_site
echo 'azure_on_branch: '$azure_on_branch