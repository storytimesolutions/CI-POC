#!/bin/bash
set -e

echo '*********************'
echo '*** Before Deploy ***'
echo '*********************'

shopt -s extglob
rm -r !(dist)
cp -r dist/* .
rm -r dist

echo '**************************'
echo '*** Done Before Deploy ***'
echo '**************************'