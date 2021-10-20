# Redwood

> **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Getting Started

- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

##### Dependencies

1. `nvm`
2. Node version 14, because that's what redwood uses. Try `nvm install 14`, then `nvm use 14`.

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

After running this dev server, access the Graphql playground at: http://localhost:8910/api/graphql

Check out the components in the Story Book

```terminal
yarn rw storybook
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

### Local Postgres Setup

See docs for [Local Postgres Setup](https://redwoodjs.com/docs/local-postgres-setup)

After you've set up postgres, run `yarn rw prisma migrate dev`

### Ngrok it to the web

```bash
# Example
ngrok http --host-header=rewrite 10.61.141.234:8910
```

# Additional Documentation

- Torus [/docs/Torus.md](/docs/Torus.md)
- Devops + Going to Production [/docs/Devops.md](/docs/Devops.md)
- NFTs and IPFS [/docs/NFTs + IPFS.md](/docs/NFTs + IPFS.md)
