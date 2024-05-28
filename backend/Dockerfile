FROM node:20.5.1

WORKDIR /usr/src/app

RUN npm install -g npm@10.8.0

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
