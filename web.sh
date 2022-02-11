#!/bin/bash -ve
$(node tasks/environment/setupEnv)
yarn build-packages
yarn rw dev web
