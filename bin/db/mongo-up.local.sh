#!/bin/bash

IS_MONGODB_NOT_UP=$(docker ps | grep mongodb > /dev/null; echo $?)

if (($IS_MONGODB_NOT_UP))
then
  echo '============================'
  echo ' creating mongodb container '
  echo '============================'
  echo
  docker pull mongo
  docker run --name mongodb -d -p 27017:27017 mongo mongod
  echo
  echo '======================'
  echo ' mongodb container up '
  echo '======================'
else
  echo '=============================='
  echo ' mongodb container already up '
  echo '=============================='
fi
