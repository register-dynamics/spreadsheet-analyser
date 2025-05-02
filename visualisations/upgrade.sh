#!/bin/bash
IFS=$'\n\t'
set -xeuo pipefail

sed -i '' -e '5i\
<link rel="stylesheet" type="text/css" href="./regdyn.css">
' index.html

sed -i '' -e '6i\
<link rel="icon" type="image/png" href="assets/logo.png">
' index.html

sed -i '' -e '8i\
<img src="assets/banner.svg">
' index.html
