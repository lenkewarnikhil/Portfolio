FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Replace ${PORT} with the actual environment variable before starting nginx
CMD sed -i "s/\${PORT}/$PORT/g" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
