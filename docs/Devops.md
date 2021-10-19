# Devops

### Serverless Considerations

The built api must be <50MB for Vercel. Use these commands to check the current size of `/zipped/graphql.zip`

```bash
yarn rw build api && \
yarn zip-it-and-ship-it api/dist/functions/ zipped
```

### Docker

Images are built via Github Action. To build the images locally:

```bash
# web
docker build . -t pi0neerpat/treasure-chess-redwood-web-main -f web/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local


# api
docker build . -t pi0neerpat/treasure-chess-redwood-web-main -f api/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local \
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
       ghcr.io/pi0neerpat/treasure-chess-redwood-api-main:latest
```

Killing Docker

```bash
# WARNING: may kill other containers on your machine
sudo killall containerd-shim && docker-compose down
#
docker kill CONTAINER
# kill stubborn container
sudo service docker restart
# kill running containers
docker kill $(docker ps -q)
# !!! Remove all containers~!!!
docker rm --force $(docker ps -a -q)
```
