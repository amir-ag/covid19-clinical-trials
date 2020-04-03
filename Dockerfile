FROM ubuntu:18.04

RUN apt update && apt upgrade -y && apt install -qqy \
    wget \
    bzip2 \
    libssl-dev \
    openssh-server

RUN mkdir /scripts
RUN mkdir /nginx

# pass all the files and folders from local folder to image
COPY ./frontend /frontend

COPY ./scripts/* /scripts/
RUN chmod +x /scripts/*

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -y nodejs && apt-get install -y npm

# set the working directory to /app for whenever you login into your container
WORKDIR /frontend
COPY ./frontend/package.json /frontend/
COPY ./frontend/package-lock.json /frontend/
RUN npm i
COPY ./frontend /frontend
RUN npm run build

WORKDIR /frontend