#!/bin/bash -ve
$(node tasks/environment/setupEnv)
yarn rw serve api
