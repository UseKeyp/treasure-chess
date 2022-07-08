# Discord

To test bots locally, you must add to your .env `ENABLE_DISCORD_BOTS=true`. **PLEASE REMOVE IT** once you're finished.

### Localization

Bot commands can have localization strings. See https://discord.com/developers/docs/interactions/application-commands#create-global-application-command

# Public notifications bot

- Application ID: `970838171657043979`
- Bot name: `Treasure Chess`
- Add Bot link: https://discord.com/api/oauth2/authorize?client_id=970838171657043979&permissions=2048&scope=bot%20applications.commands

# Admin bot

### dev

- Application ID: `898279187574558721`
- Bot name: `chester-dev`
- Add Bot link: https://discord.com/api/oauth2/authorize?client_id=898279187574558721&permissions=2147485696&scope=bot%20applications.commands

### staging

- Application ID: `971180791331704872`
- Bot name: `chester-staging`
- Add Bot link: https://discord.com/api/oauth2/authorize?client_id=971180791331704872&permissions=2147485696&scope=bot%20applications.commands

### prod

- Application ID: `971181319163891752`
- Bot name: `Chester`
- Add Bot link: https://discord.com/api/oauth2/authorize?client_id=971181319163891752&permissions=2147485696&scope=bot%20applications.commands

# Slash Commands

If you add new commands, they must be registered with:

> NOTE: You must set ENABLE_DISCORD_BOTS=false in your .env

```bash
$(node tasks/environment/setupEnv) && yarn rw exec discord
```

Notes:

- Global commands are cached for one hour. New global commands will fan out slowly across all guilds and will only be guaranteed to be updated after an hour. Guild commands update instantly. As such, we recommend you use guild-based commands during development and publish them to global commands when they're ready for public use.
- Each option must have a description
