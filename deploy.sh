#!/bin/bash

set -e

BRANCH="main"
BUILD_DIR="build"
DEPLOY_DIR="/var/www/vinayprabhakar.tech"
SERVER="root@<SERVER_IP>"

function log {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Switching to branch $BRANCH"
git checkout $BRANCH

log "Pulling latest changes..."
git pull origin $BRANCH

log "Building app..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
    log "Error: Build directory $BUILD_DIR does not exist. Exiting."
    exit 1
fi

log "Deploying files to server..."
scp -r $BUILD_DIR/* $SERVER:$DEPLOY_DIR

log "Deployment complete!"
