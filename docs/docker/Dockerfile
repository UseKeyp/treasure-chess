# ==
# Base
# FROM node:14 as base
#
# WORKDIR /app
#
# COPY package.json package.json
# COPY yarn.lock yarn.lock
#
# COPY redwood.toml redwood.toml
# COPY graphql.config.js graphql.config.js
#
# COPY packages packages
# COPY api/package.json api/package.json
# COPY web/package.json web/package.json
#
# RUN yarn install --frozen-lockfile
#
# # ==
# # Build
# FROM base as build
#
# COPY api api
# COPY web web
# COPY packages packages
#
# RUN yarn build-packages && yarn rw build

# ==
# Serve
FROM node:14 as serve

WORKDIR /app

COPY scripts/environment/ scripts/environment/
COPY dev.env.enc.js dev.env.enc.js
COPY prod.env.enc.js prod.env.enc.js
COPY serve.sh serve.sh

# TODO delete these
COPY packages /app/packages
COPY .prisma /app/api/node_modules/.prisma
COPY api/dist /app/api/dist
COPY package.json /app/package.json
COPY api/package.json /app/api/package.json
COPY yarn.lock /app/api/yarn.lock
COPY web/dist /app/web/dist
COPY redwood.toml /app/redwood.toml

# COPY --from=build /app/packages /app/packages
#
# COPY --from=build /app/node_modules/.prisma /app/api/node_modules/.prisma
# COPY --from=build /app/api/dist /app/api/dist
# COPY --from=build /app/package.json /app/package.json
# COPY --from=build /app/api/package.json /app/api/package.json
# COPY --from=build /app/yarn.lock /app/api/yarn.lock
#
# COPY --from=build /app/web/dist /app/web/dist
#
# COPY --from=build /app/redwood.toml /app/redwood.toml

RUN yarn --cwd "api" --production --frozen-lockfile install
# RUN yarn --cwd "api" --production --frozen-lockfile install && \
# yarn --cwd "api"  add @redwoodjs/cli

# RUN yarn --cwd "api" --production --frozen-lockfile install && \
# yarn add @redwoodjs/cli

EXPOSE 8910

ENTRYPOINT [ "./serve.sh" ]
CMD []
