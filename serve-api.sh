#!/bin/bash -ve
$(node scripts/environment/setupEnv)
yarn rw serve api
