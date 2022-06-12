#!/bin/bash -ve
$(node tasks/environment/setupEnv)
yarn build-packages
yarn rw dev api

# Maybe useful for Capacitor Android hosts?
#yarn rw dev api --fwd="--allowed-hosts all"
