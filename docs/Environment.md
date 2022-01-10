# encrypted-env-demo

> An example app using encrypted environment variables.

⚠️ WARNING: The documentation and code here may be incorrect or outdated. Use at your own risk. Comments and suggestions welcome.

IMPORTANT: The first step to implementing this is adding `.env.js` to your `.gitignore` file! Do it now.

# Overview

There are 2 secret environment files:

1. `.env`: where the encryption secrets are kept
2. `.env.js`: where environment variables are kept/updated before encryption

In addition, there are two encrypted environment files, `prod.env.enc` and `dev.env.enc`, which are the result of encrypting `env.js`. When the app is run, one of these files is decrypted and injected into the node environment. These files are to be checked into the repo, and available to all members on the team.

# Usage

> For new developers in a team to run the app.

1. Use `.env.template` to create your `.env` file. Ask your team lead for the `ENCRYPTION_x` variables for the _development_ environment.

2. Start the app by running the following command:

```bash
node scripts/environment/setupEnv && yarn rw dev
```

Depending on the value of `NODE_ENV` in your `.env` file, the correct ciphertext will be decrypted: `dev.env.enc` or `prod.env.enc` and injected.

3. If you want to modify a specific environment variable, the easiest way is to just add it to your `.env`, which will take precedence over the variables in the encrypted file.

# Devops

> For team leaders to generate secrets and create encrypted files.

### Generate Keys

1. Generate a new secret with `openssl rand -base64 24`. WARNING: This method sucks. You should come up with your own way to generate keys.
2. Run the `keyGen` script:

```bash
# WARNING this will overwrite `.env`
node scripts/environment/keyGen
```

The `.env` will be updated with the new secret and a fresh initialization vector (iv). Note that the iv can be re-used with new secrets.

### Create the Encrypted Files

1. Use `.env.template.js` to create your `.env.js` file, and add your environment variables.

2. Run the encryption script. To create the production `prod.env.enc`, just change the output filename in the script.

```bash
# WARNING this will overwrite `dev.env.enc`
node scripts/environment/encrypt
```

2. Test it worked by running the decryption script:

```bash
node scripts/environment/decrypt
```

Done!

# Installation

Here's what you need to add this to your project:

1. Copy the files from here:

```
/scripts/environment/*
.env.template
default.env.js
```

2. Install the packages

```
yarn add -D -W dotenv readline
```
