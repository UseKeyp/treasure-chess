###########################################################################################
# Builder: node
###########################################################################################

FROM node:14 as builder

# Node
ARG NODE_ENV
ARG RUNTIME_ENV
ARG REDWOOD_API_URL
ARG BASIC_AUTH_PASSWORD
ARG ETHEREUM_NETWORK_NAME
ARG APP_DOMAIN

ENV NODE_ENV=$NODE_ENV
ENV RUNTIME_ENV=$RUNTIME_ENV
ENV REDWOOD_API_URL=$REDWOOD_API_URL
ENV BASIC_AUTH_PASSWORD=$BASIC_AUTH_PASSWORD
ENV ETHEREUM_NETWORK_NAME=$ETHEREUM_NETWORK_NAME
ENV APP_DOMAIN=$APP_DOMAIN

# Set workdir
WORKDIR /app

COPY web web
COPY packages packages
COPY .nvmrc .
COPY graphql.config.js .
COPY package.json .
COPY redwood.toml .
COPY yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Build packages
RUN yarn build-packages

# Build
RUN yarn rw build web

# Clean up
RUN rm -rf ./web/src

###########################################################################################
# Runner: Nginx
###########################################################################################

FROM nginx as runner

# Copy dist
COPY --from=builder /app/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY web/config/nginx/default.conf /etc/nginx/conf.d/default.conf

# List files
RUN ls -lA /usr/share/nginx/html

# Expose RedwoodJS web port
EXPOSE 8910
