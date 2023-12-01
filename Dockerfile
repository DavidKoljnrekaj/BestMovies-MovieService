# movie-service/Dockerfile
FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install && npm cache clean --force

COPY src/ /app/

EXPOSE 5001

CMD ["node", "server.js"]
