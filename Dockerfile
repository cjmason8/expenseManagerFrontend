FROM cjmason8/ubuntu-nodev6:latest

MAINTAINER "Chris Mason <cjmason8@gmail.com>"

# App Config
COPY src /app/src
COPY *.js /app/
COPY index.html /app/
COPY package.json /app/

WORKDIR /app

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
