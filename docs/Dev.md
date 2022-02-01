# Ngrok

Useful for testing webhook from Wyre. Open a ngrok to your local dev environment

```bash
ngrok http --host-header=rewrite 10.61.141.225:8910
# OR using specified domain
ngrok http -region=us --hostname=tc-checkout-dev.ngrok.io --host-header=rewrite 0.0.0.0:8910

> Forwarding https://tc-checkout-dev.ngrok.io -> http://0.0.0.0:8910
```
