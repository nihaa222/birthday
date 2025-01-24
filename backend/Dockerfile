FROM node:14-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

EXPOSE 3000

RUN npm install -g nodemon

CMD ["npm", "start"]