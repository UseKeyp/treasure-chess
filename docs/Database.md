# Database

## Installation

See this guide to setup local postgres https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database


```bash
CREATE DATABASE dev;
CREATE ROLE dev WITH PASSWORD 'letmein' CREATEDB SUPERUSER LOGIN;
```

### Last ditch effort

⚠️ This will delete everything in your db!!!

```bash
yarn rw prisma migrate reset
```
