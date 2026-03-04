# Stage 1: Install dependencies with production flag
FROM node:22-alpine AS todo-deps
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci --only=production --omit=dev --prefer-offline --no-audit --no-fund

# Stage 2: Build the application
FROM node:22-alpine AS todo-backend-build
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Production runtime image with minimal base
FROM node:22-alpine
WORKDIR /usr/app
# Copy only necessary files from build stage
COPY --from=todo-backend-build /usr/app/build ./build
# Copy only production dependencies
COPY --from=todo-deps /usr/app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 80

CMD ["node", "build/index.js"]