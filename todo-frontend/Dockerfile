# TodoApp/todo-frontend/Dockerfile

# Build stage with minimal base image
FROM node:22-alpine-slim AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with production flag and cache optimization
RUN npm ci --omit=dev --only=production --prefer-offline --no-audit --no-fund

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production: Nginx Static Server with minimal base
FROM nginx:1.28.0-alpine AS final

# Install only necessary tools
RUN apk add --no-cache gettext

# Copy built application
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx configurations
COPY nginx/base /etc/nginx/base
COPY nginx/conf.d/routes/todoapp.keyboardcrash.com.conf /etc/nginx/conf.d/routes/todoapp.keyboardcrash.com.conf
COPY nginx/conf.d/nginx.conf /etc/nginx/nginx.conf

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
