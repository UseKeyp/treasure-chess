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
COPY web/package.json web/package.json
COPY packages packages
COPY scripts/environment/ scripts/environment/
COPY serve.sh .
COPY dev.env.enc.js .
COPY prod.env.enc.js .
COPY .nvmrc .
COPY graphql.config.js .
COPY package.json .
COPY redwood.toml .
COPY yarn.lock .

# Install dependencies
RUN yarn install --frozen-lockfile

# Install additional dependencies
# RUN yarn add react react-dom --ignore-workspace-root-check

# Build packages
RUN yarn build-packages && yarn rw build api

# Clean up
# RUN rm -rf ./api/src

# Expose RedwoodJS api port
EXPOSE 8911

# Entrypoint to @redwoodjs/api-server binary
ENTRYPOINT ["./serve.sh"]
