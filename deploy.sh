#!/bin/sh
CURRENT_BRANCH=$(git branch --show-current)
echo 'start client build...'
npm run client:build
echo 'client build finished'
echo 'start staging files...'
git add .
sleep 3
echo 'staging finished'
echo 'start commit files...'
git commit -m 'build&deploy'
echo 'commit finished'
echo 'start deploy to heroku...'
git push heroku "${CURRENT_BRANCH}":master --force
echo 'deploy to heroku finished'
