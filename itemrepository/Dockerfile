FROM node:dubnium

WORKDIR /code

COPY package.json package.json

COPY database.js database.js

COPY app.js app.js

RUN npm install

CMD node app.js
