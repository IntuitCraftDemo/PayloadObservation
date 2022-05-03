FROM node:17.7.1

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000