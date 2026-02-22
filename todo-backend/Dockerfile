# Stage 1: Install dependencies
FROM node:22-alpine AS todo-deps
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci

# Stage 2: Build the application
FROM todo-deps AS todo-backend-build
ENV NODE_PATH=./build
COPY . .
RUN npm run build

# Stage 3: Production runtime image
FROM node:22-alpine
WORKDIR /usr/app

# Copy only necessary files from build stage
COPY --from=todo-backend-build /usr/app/build ./build
COPY --from=todo-deps /usr/app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 80

CMD ["node", "build/index.js"]
