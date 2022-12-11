# Install dependencies only when needed
FROM node:14-alpine AS deps

RUN apk add --no-cache libc6-compat make g++
WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN rm -rf node_modules
RUN npm install

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /opt/web
COPY . .
COPY --from=deps /opt/web/node_modules ./node_modules
RUN npm run build && npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:14-alpine AS runner
WORKDIR /opt/web

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN rm -rf .next
RUN rm -rf /opt/web/.next
RUN rm -rf ./.next
RUN rm -rf ./node_modules
RUN rm -rf node_modules
RUN rm -rf /opt/web/node_modules

COPY --from=builder /opt/web/next.config.js ./
COPY --from=builder /opt/web/public ./public
COPY --from=builder /opt/web/node_modules ./node_modules
COPY --from=builder /opt/web/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /opt/web/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

# # The following line disables next anonymous telemetry telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]


# FROM node:12.19-alpine as builder

# WORKDIR /opt/web
# COPY package.json package-lock.json ./
# RUN npm install

# ENV PATH="./node_modules/.bin:$PATH"

# COPY . .
# RUN npm run build

# FROM nginx:1.17-alpine

# RUN apk --no-cache add curl

# RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
#     chmod +x envsubst && \
#     mv envsubst /usr/local/bin

# COPY ./nginx.config /etc/nginx/nginx.template

# COPY --from=builder /opt/web/build /usr/share/nginx/html

# EXPOSE 3000

# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
