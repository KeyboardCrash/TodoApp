# git/TodoApp/todo-frontend/Dockerfile

# Base stage for dependencies
FROM node:22-alpine AS dependencies
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci

# Build stage
FROM dependencies AS build
COPY . .
RUN npm run build
