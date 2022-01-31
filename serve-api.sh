#!/bin/bash -ve
$(node tasks/environment/setupEnv)
yarn rw prisma migrate deploy
yarn rw serve api
