FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

COPY webpack.config.js /usr/src/app/
COPY assets /usr/src/app/assets
COPY src /usr/src/app/src
RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
