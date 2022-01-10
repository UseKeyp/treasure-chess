#!/bin/bash -ve
node scripts/environment/setupEnv >> .env

yarn rw serve
