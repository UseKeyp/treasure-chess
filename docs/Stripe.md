# Stripe

https://dashboard.stripe.com/test/logs

### Development

```bash
stripe listen --events checkout.session.completed --forward-to localhost:8911/checkout

stripe trigger checkout.session.completed
```

#### Cards

- 4242 4242 4242 4242 success
- 4000 0025 0000 3155 needs auth
- 4000 0000 0000 9995 fail

#### Crypto

https://stripe.com/docs/connect/crypto-payouts
https://support.stripe.com/questions/crypto-supportability-and-availability-by-region
