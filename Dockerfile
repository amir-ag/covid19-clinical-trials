FROM ubuntu:18.04

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt update && apt upgrade -y && apt install -qqy \
    wget \
    bzip2 \
    libssl-dev \
    openssh-server

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && apt-get install -y nodejs && apt-get install -y npm
RUN npm install -g npm@latest

RUN mkdir -p /scripts
COPY ./scripts/* /scripts/
RUN chmod +x /scripts/*

#RUN mkdir -p /nginx
RUN mkdir -p /frontend
RUN mkdir -p /frontend_tmp
WORKDIR frontend_tmp

COPY ./frontend/package.json /frontend_tmp
#RUN npm cache verify
RUN npm i
COPY ./frontend /frontend_tmp
RUN npm run build


WORKDIR /frontend








