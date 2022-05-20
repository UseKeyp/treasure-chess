FROM pi0neerpat/redwood-api-base as base

WORKDIR /app

ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT

COPY api/dist /app/api/dist
COPY node_modules/.prisma /app/node_modules/.prisma
COPY tasks/environment/ tasks/environment/

COPY api/db /app/api/db
COPY redwood.toml .
COPY serve-api.sh .

COPY .env.dev.js.enc .
COPY .env.sandbox.js.enc .
COPY .env.staging.js.enc .
COPY .env.prod.js.enc .

COPY base.package.json package.json
RUN yarn

# Expose RedwoodJS api port
EXPOSE 8911

# Entrypoint to @redwoodjs/api-server binary
ENTRYPOINT ["./serve-api.sh"]
