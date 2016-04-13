#!/bin/bash
set -e

echo '*********************'
echo '*** Before Deploy ***'
echo '*********************'

echo 'Removing node_modules'
rm -f -r node_modules
rm -f index.html
echo 'Removed node_modules
