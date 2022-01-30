# Environments

### aes-256-gcm

- Initialization vector (iv) has 12 bytes (96 bits). Must be unique but not necessarily random. New iv should be generated each time.

### Devops

NOTE: A new iv must be generated for each new production encrypted file.

1. Generate a new secret with `openssl rand -base64 24`. WARNING: This method sucks. You should come up with your own way to generate keys. Add this to a `.env` file as `ENCRYPTION_KEY`.
2. Run the `keyGen` script:

```bash
# WARNING this will overwrite `.env`
node tasks/environment/keyGen
```

3. Encrypt the files. Change `ENVIRONMENT_LIST`, then run

```bash
node tasks/environment/encrypt
```

### Example implementations

- aes-256-gcm https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81
- aes-256-gcm with a buffer https://stackoverflow.com/questions/53269132/aes-256-gcm-encryption-decryption-in-nodejs

### Hasicorp vault

vault dev server unseal key nr/GT+uvbwScDmsiTChtRTnInSTHtvm0bOAUa6p9o6c=

```
# Create a secret
vault kv put secret/foo bar=baz

# Get a secret
vault kv get secret/foo

# Get only the secret value with -field
vault kv get -field=bar secret/foo
vault kv delete secret/foo

# add a new engine at a specific path
vault secrets enable -path=kv kv
vault secrets disable kv/

# list all the paths
vault secrets list

# list secrets at a path
vault kv list kv/
```
