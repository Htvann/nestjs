FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn 

COPY . .

CMD [ "yarn", "start:dev" ]

EXPOSE 3000
