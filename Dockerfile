FROM node:15.7.0-alpine3.10

WORKDIR /app

ADD package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

ENTRYPOINT  ["node", "index.js"]

CMD ["--baseFolder","C:\\Users\\hachb\\Desktop\\online-shop-bencehSpring-develop\\"]
