#!/bin/bash

set -e

while getopts ":p:" opt; do
  case $opt in
    # Provide commands to run
    p)
      PASSWORD="${OPTARG}"
    ;;
    \?)
      echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

docker login --username=cjmason8 --password=$PASSWORD
docker pull cjmason8/expense-manager-frontend:latest
docker run -p 45612:3000 -d cjmason8/expense-manager-frontend:latest
