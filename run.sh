#!/bin/zsh

npm install
npm run build
sudo cp -rf build /var/www/html/.