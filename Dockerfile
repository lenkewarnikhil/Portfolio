# ── Stage 1: Build ──────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (cached unless package files change)
COPY package*.json ./
RUN npm ci

# Declare build-time args for Vite env vars.
# Railway: set these as "Build Arguments" in your service settings,
# or they will be empty and features like EmailJS/reCAPTCHA won't work.
ARG VITE_EMAIL
ARG VITE_LINKEDIN_URL
ARG VITE_GITHUB_URL
ARG VITE_TWITTER_URL
ARG VITE_REDDIT_URL
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_RECAPTCHA_SITE_KEY

# Copy source and build (Vite reads ARGs as env vars during build)
COPY . .
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Replace ${PORT} with runtime env (default 8080 if not set), then start
CMD sh -c "sed -i \"s/\${PORT}/${PORT:-8080}/g\" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
