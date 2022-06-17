# gyp errors when yarn installing

You're missing some weird dependencies.
Run

```sh
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

# Testing on mobile

1. Run `yarn rw storybook`. Check the CLI output to get the appropriate IP address for your machine eg. `http://172.17.123.20:7910`
2. Replace the port with `8910`, then open on your phone eg. `http://172.17.123.20:8910/treasures`

# Ngrok

Useful for testing webhook from Wyre. Open a ngrok to your local dev environment

```bash
ngrok http --host-header=rewrite 10.61.141.225:8910
ngrok http --host-header=rewrite 0.0.0.0:8911
# OR using specified domain
ngrok http --hostname=tc-checkout-dev.ngrok.io --host-header=rewrite 0.0.0.0:8911

> Forwarding https://tc-checkout-dev.ngrok.io -> http://0.0.0.0:8910
```
