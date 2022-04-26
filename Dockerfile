FROM node:14

WORKDIR /app
COPY api/package.json .

# Only install necessary dependencies.
# Uses Lerna for linking local packages, and Prisma for migrations
RUN yarn global add @redwoodjs/api-server @redwoodjs/internal lerna prisma && \
      yarn cache clean && \
# Helpful utilities for exploring your container
      apt-get update && apt install -y nano ncdu && apt-get clean

RUN yarn install --production
