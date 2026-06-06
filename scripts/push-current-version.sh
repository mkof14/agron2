#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="/Users/mk/Desktop/agron"
REPO_DIR="/Users/mk/Desktop/Desk  /agron"

cd "$REPO_DIR"
git status --short

rsync -av --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.DS_Store' \
  "$SOURCE_DIR/" "$REPO_DIR/"

npm install
npm run build

git status --short
git add .
git commit -m "feat: refine AGRON presentation hub"
git push origin main

if command -v vercel >/dev/null 2>&1; then
  vercel --prod
else
  echo "GitHub push complete. Vercel should deploy automatically if the project is connected to GitHub."
fi
