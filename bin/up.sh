#!/bin/bash

echo "==================="
echo "Setting up env vars"
echo "==================="
# mark variables for automatic export
set -a

CURRENT_DIR=$(pwd)
WORKING_DIR=$(dirname $0)

if [ $WORKING_DIR = '.' ]
then
WORKING_DIR=$CURRENT_DIR
fi

. "$WORKING_DIR/.env"

# disable automatic variable export
set +a

echo
echo "==============================="
echo "Setting up shared configuration"
echo "==============================="
sh "$WORKING_DIR/shared/shared-up.sh"

echo
echo "==================="
echo "Setting up database"
echo "==================="
sh "$WORKING_DIR/db/mongo-up.sh"
sh "$WORKING_DIR/db/pg-up.sh"

echo
echo "=============="
echo "Setting up app"
echo "=============="
sh "$WORKING_DIR/app/app-up.sh"
