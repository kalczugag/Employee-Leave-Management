FROM node:20.5.1

# ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN npm install -g npm@10.8.0

COPY package*.json ./

RUN npm install --force

COPY . .

# RUN npm run build

CMD [ "sh", "-c", "npm run dev" ]