###########################################################################################
# Runner: node
###########################################################################################

FROM node:14 as runner

# Node
ARG NODE_ENV
ARG RUNTIME_ENV

ENV NODE_ENV=$NODE_ENV
ENV RUNTIME_ENV=$RUNTIME_ENV

# Set workdir
WORKDIR /app

# Copy files
COPY api api
# TODO: Figure our better solution than copy web, and remove react dep
COPY web web
COPY packages packages
COPY dev.env.enc.js dev.env.enc.js
COPY prod.env.enc.js prod.env.enc.js
COPY scripts/environment/setupEnv.js scripts/environment
COPY .nvmrc .
COPY graphql.config.js .
COPY package.json .
COPY redwood.toml .
COPY yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Build packages
RUN yarn build-packages

# Build api
RUN yarn rw build api

# Set database baseline
# We only need to do this once per database
# RUN yarn rw prisma migrate resolve --applied 20210311161829_baseline0

# Migrate database
# This has been commented out in this example post
# RUN yarn rw prisma migrate deploy

# Seed database
# This has been commented out in this example post
# RUN yarn rw prisma db seed

# Clean up
RUN rm -rf web
RUN rm -rf ./api/src

# Debugging
RUN ls -lA ./api/dist

# Set api as workdirectory
# WORKDIR /app/api

# Expose RedwoodJS api port
EXPOSE 8911

# Entrypoint to @redwoodjs/api-server binary
ENTRYPOINT [ "node","scripts/environment/setupEnv.js","&&","yarn", "rw", "serve", "api", "--port", "8911", "--rootPath", "/api" ]
