#!/usr/bin/env sh
set -e
yarn run build
cd dist
git init
git add -A
git commit -m 'Deploy frontend'
git push -f git@github.com:daviidli/summary.git master:gh-pages
cd -
