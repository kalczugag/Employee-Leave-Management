FROM node:20.5.1

WORKDIR /usr/src/app

RUN npm install -g npm@10.8.0

COPY package*.json ./
COPY vite.config.mts ./

COPY . .

RUN npm install --force

EXPOSE 3000

CMD ["npm", "run", "start"]
