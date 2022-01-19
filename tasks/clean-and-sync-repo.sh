#!/bin/bash -e

# To test this locally run:
# export SSH_PRIVATE_KEY=$(cat ~/.ssh/id_ed25519-treasurechess) && ./tasks/clean-and-sync-repo.sh

# Get current commit hash and comment
LATEST_COMMIT_SHORT_REV=$(git rev-parse --short HEAD)
LATEST_COMMIT_COMMENT=$(git log -1 --pretty=%B)

# Cleanup
rm -rf .git
rm -f dev.env.enc.js
rm -f prod.env.enc.js
rm -rf -f docs

# New git history
git init
git checkout -b main
git add --a
git commit -m "${LATEST_COMMIT_SHORT_REV} - ${LATEST_COMMIT_COMMENT}"

# Configure ssh
mkdir -p ~/.ssh
echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' >~/.ssh/id_rsa-repo-sync
chmod 600 ~/.ssh/id_rsa-repo-sync
cp /root/.ssh/* ~/.ssh/ 2>/dev/null || true

# Configure git
GIT_SSH_COMMAND="ssh -v"
git config --local core.sshCommand "/usr/bin/ssh -i ~/.ssh/id_rsa-repo-sync"

# Push
git remote add remote git@github.com:treasure-chess/treasure-chess.git
git push remote main -f
