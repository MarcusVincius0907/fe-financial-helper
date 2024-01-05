# Stage 1: Build Angular application
FROM node AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Use Nginx to serve the built files
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
