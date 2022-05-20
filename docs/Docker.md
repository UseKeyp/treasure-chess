## Docker

### Overview

**Web Docker image:**

- Docker nginx runner
- nginx config from `/web/config/nginx/default.conf`
- Built files end up in `/etc/nginx/conf.d/default.conf`
- Must pass `REDWOOD_API_URL`

**Api Docker image** has 3 distinct steps:

1. Install

   - Installs everything.

2. Build

   - Inherits everything from previous step and builds the packages and api.

3. Serve

   - Inherits build files, scripts, packages, and `.prisma` from build step.
   - Installs prod+dev dependencies in `/api/package.json`
   - Includes `dotenv` for running `setupEnv.js`
   - Includes `react` which is needed for some reason?
   - Includes `@redwoodjs/cli` for running `rw serve`?
   - Includes `core-js`
   - Entrypoint `./serve-api.sh`

## Build

Images are built via Github Action or GHCR. To build the images locally:

```bash
# web
docker build . -t pi0neerpat/treasure-chess-web -f web/Dockerfile \
--build-arg ENVIRONMENT=local \
--build-arg VERSION=v-local \
--build-arg ETHEREUM_NETWORK_NAME=matic \
--build-arg REDWOOD_API_URL=http://0.0.0.0:8911 \
--build-arg APP_DOMAIN=http://0.0.0.0:8910

# api
docker build . -t pi0neerpat/treasure-chess-api -f api/Dockerfile --build-arg ENVIRONMENT=dev
```

## Run

Start both containers with `docker-compose`

```bash
docker-compose up
```

If you did not build the images locally, you'll need to download them from the Github Container Registry (GHCR). To enable access to GHCR, create a `GITHUB_PAT` in your Github "Developer Settings" with permissions `read:packages`.

```bash
# Authenticate
docker login https://ghcr.io -u USERNAME -p GITHUB_PAT
```

To run a single image use `docker run`:

```bash
docker run -it --rm \
      -p 8911:8911 \
      -e REDWOOD_API_URL=http://0.0.0.0:8911 \
      --env-file .env \
      pi0neerpat/treasure-chess-api:latest

docker run -it --rm \
       -p 8910:8910 \
        pi0neerpat/treasure-chess-web:latest
```

#### Connecting to a local database

If you cannot connect to your local database, run `ifconfig docker0` and update the host for the database eg. "172.17.0.1". More info at https://stackoverflow.com/questions/31249112/allow-docker-container-to-connect-to-a-local-host-postgres-database

Also, I had to update the following line on my local machine in `/etc/postgresql/12/main/postgresql.conf`

```
listen_addresses = '*'
```

## Explore

Helpful commands for exploring containers.

```bash
# Container
docker exec -u 0 -it <containerId> /bin/bash

# Image (read-only?)
docker run --rm -it --entrypoint=/bin/bash <imageId>
```

## Troubleshoot

```bash
# WARNING: may kill other containers on your machine
sudo killall containerd-shim && docker-compose down

sudo netstat -tulpn | grep :8910
# or
sudo lsof -i tcp:8910
sudo kill 1888
sudo kill -9 $(sudo lsof -t -i:8910) && sudo kill -9 $(sudo lsof -t -i:8911)

docker kill CONTAINER
# kill stubborn container
sudo service docker restart
# kill running containers
docker kill $(docker ps -q)
# !!! Remove all containers~!!!
docker rm --force $(docker ps -a -q)

sudo /etc/init.d/docker restart

# Potential fix for this problem
sudo aa-remove-unknown
https://javahowtos.com/guides/124-docker/414-solved-cannot-kill-docker-container-permission-denied.html

sudo apt purge --auto-remove apparmor
sudo service docker restart
docker system prune --all --volumes
```

## Image size-reduction tests

redwood-release-devops example

```
docker run --rm -it --entrypoint=/bin/bash <imageId>

apt-get install ncdu
ncdu
```

## Devops repo

#### `33b`

Start of experiment

container 2.15G
node_modules 2.2G
@redwoodjs 972.1 M
@prisma 229.2 M

#### `0201`

Changed `RUN yarn install --production && yarn global add @redwoodjs/api-server @redwoodjs/internal`

container 1.48G
node_modules 82 M
@redwoodjs 1.8 M
@prisma n/a
/root 208 Kb
/usr/local/share/.cache/yarn 446 M
/usr/lib x86_64-linux-gnu 299 M
/usr/local/share/.config/yarn/global 194 M

## tc repo

#### `dev-b11e2c5`

Start of experiment

Build time 9-11 min
container 5.45 G
node_modules 2.2 G
@redwoodjs 144 M
@storybook 192 M
@prisma 428 M
/root/.cache/prisma/master 309 M
/usr/lib x86_64-linux-gnu 303 M
/usr/local/share/.cache/yarn 2.2 G
/usr/local/share/.config/yarn/global n/a

### `e41`

Using the new --production flag, with lerna

Build time 14 min
container 3.43 G
node_modules 275 M
@redwoodjs 1.4 M
@storybook n/a
@prisma 4.9 M
/root/.cache/prisma/master n/a
/usr/lib x86_64-linux-gnu 303.5 M
/usr/local/share/.cache/yarn 2.2 G
/usr/local/share/.config/yarn/global 244 M

RESULTS: Reduced by 2GB for Treasure Chess, and 670 M for `redwood-release-devops-example`

### `3d6`

Adding prisma global, and dotenv local

container 3.68G
node_modules 275 M
/usr/local/share/.cache/yarn 2.3 G
/usr/local/share/.config/yarn/global 363 M (prisma added 110.5 M)

### `3150`

Added `yarn cache clean`

container 1.58G
node_modules 275 M
/usr/lib x86_64-linux-gnu 303.5 M
/usr/local/share/.cache/yarn 0
/usr/local/share/.config/yarn/global 363 M

Using Alpine image caused too many problems. Needed python and gyp libraries. But still many issues.

```bash
# https://dev.to/grigorkh/node-gyp-support-in-alpine-linux-4d0f
RUN apk add --no-cache --virtual .gyp python3 make g++ pkgconfig && \
apt install libpixman-1-dev libcairo2-dev libpango1.0-dev libjpeg8-dev libgif-dev && \
yarn install --frozen-lockfile
RUN apk update && apk add --no-cache -y libnss3 nano ncdu
```

### ``

Exclude install web dependencies. Needs `react` and `react-dom`
