# Discussion and Research

# Admin

## Analytics / tracking

https://github.com/PostHog/posthog as used by https://docs.meli.sh/faq

# Devops

## CI/CD

#### Potential self-hosted solutions:

https://github.com/veggiemonk/awesome-docker#cicd

- Node.js and static sited: https://docs.meli.sh
- Early project. Looks great but not sure if it will deliver https://docs.coollabs.io/

#### Passed on these options:

https://staticdeploy.io/ Easy to use. Only static, but could serve /web. Connecting to the correct api would be a challenge though
https://github.com/lewbor/simpleci
https://www.drone.io/
https://porter.run/ requires k8s

## Portable dev environments

#### Vagrant by Hashicorp

https://github.com/jedi4ever/veewee

https://learn.hashicorp.com/tutorials/vagrant/getting-started-index?in=vagrant/getting-started

#### Coder

Environment in the cloud for new developers https://coder.com/docs/coder/latest/comparison

## Preview-specific databases

#### PlanetScale

Free plan limited to 3 branches. $29/mo limited to 10 branches

Preview deployments are failing which include migrations. In order to prevent this, we need to implement per-branch databases

- https://docs.planetscale.com/concepts/branching

```bash
pscale branch create <DATABASE_NAME> <BRANCH_NAME>

# Maybe this isnt necessary for our needs
pscale deploy-request create <DATABASE_NAME> <BRANCH_NAME>

# after merge
pscale deploy-request create <DATABASE_NAME> <BRANCH_NAME>
```
