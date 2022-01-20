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

### Guid

Images are built via Github Action. To build the images locally:

```bash
# web
docker build . -t pi0neerpat/treasure-chess-redwood-web-main -f web/Dockerfile \
--build-arg NODE_ENV=production \
--build-arg RUNTIME_ENV=local \
--build-arg REDWOOD_API_URL=http://0.0.0.0:8911

# api
docker build . -t pi0neerpat/treasure-chess-redwood-api-main -f api/Dockerfile \
--build-arg NODE_ENV=production \
--build-arg RUNTIME_ENV=local

# both
docker build . -t pi0neerpat/treasure-chess-redwood-both-main \
-f docker/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local
```

Explore image contents:

```bash
docker run --rm -it --entrypoint=/bin/bash <image>
```

Run an image locally:

Create a `GITHUB_PAT` in your Github "Developer Settings" with permissions `read:packages`

```bash
# Authenticate
docker login https://ghcr.io -u USERNAME -p GITHUB_PAT

# Pull the images (web and api)
docker pull ghcr.io/pi0neerpat/treasure-chess-redwood-web-main:latest
docker pull ghcr.io/pi0neerpat/treasure-chess-redwood-api-main:latest

# Run
docker-compose up

# Alternatively, run a single image
docker run -it --rm \
       -p 8910:8910 \
        pi0neerpat/treasure-chess-redwood-api-main:latest
```

Killing Docker

```bash
# WARNING: may kill other containers on your machine
sudo killall containerd-shim && docker-compose down

sudo netstat -tulpn | grep :8910
sudo kill 1888

docker kill CONTAINER
# kill stubborn container
sudo service docker restart
# kill running containers
docker kill $(docker ps -q)
# !!! Remove all containers~!!!
docker rm --force $(docker ps -a -q)
```
