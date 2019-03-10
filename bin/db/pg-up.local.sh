#!/bin/bash

IS_POSTGRES_NOT_UP=$(docker ps | grep postgres > /dev/null; echo $?)

if (($IS_POSTGRES_NOT_UP))
then
  echo '============================='
  echo ' creating postgres container '
  echo '============================='
  echo
  docker pull postgres
  docker run --name postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -e POSTGRES_DB=rollplays -d -p 5432:5432 postgres
  echo
  echo '======================='
  echo ' postgres container up '
  echo '======================='
else
  echo '==============================='
  echo ' postgres container already up '
  echo '==============================='
fi
