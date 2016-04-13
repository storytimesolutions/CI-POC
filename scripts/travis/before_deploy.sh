#!/bin/bash
set -e

echo '*********************'
echo '*** Before Deploy ***'
echo '*********************'

echo 'Removing node_modules'
rm -f -r node_modules
rm -f index.html
git add --all
git commit -m 'Changed made by Travis deployment'
echo 'Removed node_modules'
