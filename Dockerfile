FROM ubuntu:18.04

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt update && apt upgrade -y && apt install -qqy \
    wget \
    bzip2 \
    libssl-dev \
    openssh-server

RUN mkdir /scripts
RUN mkdir /nginx


COPY ./frontend/ /frontend

COPY ./scripts/* /scripts/
RUN chmod +x /scripts/*

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && apt-get install -y nodejs && apt-get install -y npm


WORKDIR /frontend
COPY ./frontend/package.json /frontend/
COPY ./frontend/package-lock.json /frontend/
RUN npm install -g npm@latest
RUN npm cache verify
COPY ./frontend /frontend
RUN npm run build

WORKDIR /frontend

