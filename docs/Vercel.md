# Vercel

## Setup

1. Vercel cannot properly run the `setupEnv` script, so you must manually add all the env variables (sorry!)
2. Override the default BUILD COMMAND:

```
yarn build-packages && yarn rw deploy vercel
```

## Limit branches to deploy

Only builds a specific branch using the `Ignored Build Step` setting. This example only builds the "sandbox" branch

```
bash -c 'if [[$VERCEL_GIT_COMMIT_REF == "sandbox"]]; then exit 1; fi'
```

## Serverless considerations

The built `api` must be <50MB for Vercel. Use these commands to check the size of each serverless function:

```bash
yarn rw build api && \
yarn zip-it-and-ship-it api/dist/functions/ zipped
```
