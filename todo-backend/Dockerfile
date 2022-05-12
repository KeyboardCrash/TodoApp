FROM node:current-alpine as base
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .

FROM base as production
ENV NODE_PATH=./build
RUN npm run build