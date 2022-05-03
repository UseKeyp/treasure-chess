# Public notifications bot

Application ID: `970838171657043979`
Bot name: `Treasure Chess`
Add Bot here: https://discord.com/api/oauth2/authorize?client_id=970838171657043979&permissions=2048&scope=bot%20applications.commands

# Admin bot

Application ID: `898279187574558721`
Bot name: `Chester`
Add Bot here: https://discord.com/api/oauth2/authorize?client_id=898279187574558721&permissions=2147485696&scope=bot%20applications.commands

# Slash Commands

If you add new commands, they must be registered with:

```bash
$(node tasks/environment/setupEnv) yarn rw exec --prisma=false discord
```

Notes:

- Global commands are cached for one hour. New global commands will fan out slowly across all guilds and will only be guaranteed to be updated after an hour. Guild commands update instantly. As such, we recommend you use guild-based commands during development and publish them to global commands when they're ready for public use.
- Each option must have a description
