#!/bin/bash

docker run -it -v "$PWD":/usr/src/app -w /usr/src/app node:12 npm install

docker run -it -v "$PWD":/usr/src/app -w /usr/src/app node:12 npm audit
