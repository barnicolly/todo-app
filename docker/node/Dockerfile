FROM node:20-alpine3.19

RUN apk add --no-cache autoconf automake file g++ libtool make nasm libpng-dev

RUN npm install -g @vue/cli

USER node
WORKDIR /app

ENV HOST 0.0.0.0
EXPOSE 8080