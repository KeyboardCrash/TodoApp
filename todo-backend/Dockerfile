FROM node:22-alpine AS todo-deps
COPY . /usr/app/
WORKDIR /usr/app/
RUN npm ci

FROM todo-deps AS todo-backend-build
ENV NODE_PATH=./build
RUN npm run build