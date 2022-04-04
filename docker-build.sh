#!/bin/bash -ve
# $(node tasks/environment/setupEnv)
docker build . -t pi0neerpat/treasure-chess-web -f web/Dockerfile \
--build-arg ENVIRONMENT=local \
--build-arg VERSION=v-local \
--build-arg ETHEREUM_NETWORK_NAME=matic \
--build-arg REDWOOD_API_URL=http://0.0.0.0:8911 \
--build-arg APP_DOMAIN=http://0.0.0.0:8910 \
