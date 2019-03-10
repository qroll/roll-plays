#!/bin/bash
source ~/.bashrc

WORKING_DIR=~/roll-plays
SCRIPT_DIR=$WORKING_DIR/bin

echo "Running certbot renewal at $SCRIPT_DIR"
sh $SCRIPT_DIR/certbot-renew.sh > $SCRIPT_DIR/cron.log
