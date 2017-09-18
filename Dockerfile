FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install --production

COPY public /usr/src/app/public
COPY lib /usr/src/app/lib

EXPOSE 9000

CMD ["npm", "run", "start"]
