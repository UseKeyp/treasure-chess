# gyp errors when yarn installing

You're missing some weird dependencies.
Run

```sh
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

# Testing on mobile

1. Run `yarn rw storybook`. Check the CLI output to get the appropriate IP address for your machine eg. `http://172.17.123.20:7910`
2. Replace the port with `8910`, then open on your phone eg. `http://172.17.123.20:8910/treasures`

# Testing on mobile when using WSL2 

1. open your powershell with previleged access and run: `netsh interface portproxy add v4tov4 listenport=8910 listenaddress=0.0.0.0 connectport=8910 connectaddress=<your-wsl2-ip-eth0>` this will allow any ip comming from the lan to access this port and the ip of your wsl2

# Ngrok

Useful for testing webhook from Wyre. Open a ngrok to your local dev environment

```bash
ngrok http --host-header=rewrite 10.61.141.225:8910
ngrok http --host-header=rewrite 0.0.0.0:8911
# OR using specified domain
ngrok http --hostname=tc-checkout-dev.ngrok.io --host-header=rewrite 0.0.0.0:8911

> Forwarding https://tc-checkout-dev.ngrok.io -> http://0.0.0.0:8910
```
