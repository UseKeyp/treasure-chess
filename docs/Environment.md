## Outline

We use 2 secret environment files. DO NOT CHECK THESE INTO GIT.

1. `.env`: where the encryption secrets are kept
2. `.env.js`: where environment variables are kept/updated before encryption

In addition, we have two encrypted environment files, `prod.env.enc` and `dev.env.enc`, which are the output from encrypting `env.js`. When the app is run, one of these files is decrypted and injected into the node environment.

## Usage

1. Use `.env.template` to create your `.env` file. Ask Patrick or Joseph for the `ENCRYPTION_x` variables for the development environment.

2. Start the app by running the following command:

```bash
node scripts/environment/setupEnv && yarn rw dev
```

Depending on the value of NODE_ENV in your `.env` file, the correct ciphertext will be decrypted: `dev.env.enc` or `prod.env.enc` and injected.

3. If you want to modify a specific environment variable, the easiest way is to just add it to your `.env`. Anything in there will override the value in the encrypted file.

## Devops

### Generate Keys

1. Generate a new secret with `openssl rand -base64 24`
2. Run the `keyGen` script. WARNING this will overwrite `.env`.

```bash
node scripts/environment/keyGen
```

The `.env` will be updated with the new secret and a generated initialization vector.

### Create the Encrypted Files

1. Run the encryption script. WARNING this will overwrite `dev.env.enc`. To creat the production `prod.env.enc`, change the output filename in the script.

```bash
node scripts/environment/encrypt
```

2. Test it by running the decryption script:

```bash
node scripts/environment/decrypt
```

Done!
