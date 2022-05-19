<h1 align="center"><img width="600" style="border-radius: 30px;" src="https://github.com/treasure-chess/treasure-chess/blob/main/github-header.png?raw=true"/></h1>
<h1 align="center">Welcome to treasure-chess 👋</h1>

<p  align="center">
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/treasurechess_" target="_blank">
    <img alt="Twitter: treasurechess_" src="https://img.shields.io/twitter/follow/treasurechess_.svg?style=social" />
  </a>
</p>

> RedwoodJS app

**Almost all of the code & tooling for Treasure Chess has been open sourced**. We hope you find these resources useful. Happy hacking!

- App tooling using RedwoodJs 👉 https://github.com/pi0neerpat/redwood-devops-example
- Code specific to Treasure Chess (smart contracts, achievements, card generation, etc.) is on our organization page: https://github.com/treasure-chess

# Redwood

> **NOTICE:** RedwoodJS is very close to a stable version 1.0. In the last two years,
> the project has matured significantly and is already used in production by a number
> of startups. We intend to have a 1.0 release candidate before the end of 2021 and
> to release a truly production-ready 1.0 in early 2022.

## Getting Started

- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn  install
```

### Fire it up

```terminal
# This command injects necessary environment variables. See docs/environment for help
./dev.sh
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

After running this dev server, access the Graphql playground at: http://localhost:8910/api/graphql

Check out the components in Storybook

```terminal
yarn rw storybook
```

### Local Postgres Setup

See docs for [Local Postgres Setup](https://redwoodjs.com/docs/local-postgres-setup)

After you've set up postgres, run `yarn rw prisma migrate dev`

### Ngrok it to the web

```bash
# Example
ngrok http --host-header=rewrite 10.61.141.234:8910
```

## Additional Documentation

- Torus [/docs/Torus.md](/docs/Torus.md)
- Devops + Going to Production [/docs/Devops.md](/docs/Devops.md)
- NFTs and IPFS [/docs/NFTs + IPFS.md](/docs/NFTs + IPFS.md)
