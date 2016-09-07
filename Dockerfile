FROM cjmason8/ubuntu-nodev6:latest

MAINTAINER "Chris Mason <cjmason8@gmail.com>"

# App Config
COPY * /app/

WORKDIR /app

RUN npm install
RUN chmod +x /app/run.sh

EXPOSE 3000
CMD ["/app/run.sh"]
