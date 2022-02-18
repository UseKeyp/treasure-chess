#!/bin/bash -ve
$(node tasks/environment/setupEnv)
yarn rw prisma migrate dev
