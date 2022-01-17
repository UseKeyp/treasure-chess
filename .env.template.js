const env = {
  //######################################
  //              General
  //######################################

  APP_DOMAIN: 'http://0.0.0.0:8910',

  //######################################
  //              Ethereum
  //######################################

  APP_ADMIN_WALLET_ADDRESS: '0xcb81A76a565aC4870EDA5B0e32c5a0D2ec734174',
  APP_ADMIN_WALLET_MNEMONIC: '',
  CONTRACT_ADDRESS_USDC: '0x929233117b9cc261eedbf47a324cc0e9cf466e76',
  CONTRACT_ADDRESS_TREASURE: '0x9070702e8146A95A714F1be6F9eeAD6424B702E7',
  CONTRACT_ADDRESS_TREASURE_MARKET:
    '0xc9234371D7943C0A333AB1eE4e9E6583323efD5d',
  ETHEREUM_NETWORK_NAME: 'mumbai',
  PINATA_API_KEY: '',
  PINATA_API_SECRET_KEY: '',
  INFURA_ID: '',

  //#######################################
  //              Sentry.io
  //#######################################

  // DEVELOPMENT
  SENTRY_DSN: '',

  //#######################################
  //                Discord
  //#######################################

  DISCORD_BOT_TOKEN: '',

  //#######################################
  //                  Wyre
  //#######################################

  // DEVELOPMENT
  WYRE_API_KEY: '',
  WYRE_SECRET_KEY: '',
  WYRE_ACCOUNT_ID_TREASURE: '',
  // Amount of USD to be spent, used to create the order reservation.
  WYRE_MINT_USD_SOURCE_AMOUNT: 6,
  // Cost of the NFT, used to validate the order webhook is actually paying full amount.
  WYRE_MINT_USD_PURCHASE_AMOUNT: 1,

  //#######################################
  //             Chess.com API
  //#######################################

  // DEVELOPMENT
  CHESS_API_URL: 'https://api.chess-6.com',
  // Required to avoid rate-limiting on the public API
  CHESS_API_ACCESS_TOKEN: '',

  //#######################################
  //        General OAuth + Sessions
  //#######################################

  // DEVELOPMENT
  PUBLIC_REDIRECT_URL: 'http://0.0.0.0:8910/redirect',
  // Create your own with "yarn rw g secret"
  SESSION_SECRET: '',

  //#######################################
  //                Torus
  //#######################################

  // DEVELOPMENT
  TORUS_VERIFIER: 'chess-4',

  //#######################################
  //             Chess.com OAuth
  //#######################################

  // DEVELOPMENT
  CHESS_OAUTH_URL: 'https://oauth.chess-4.com',
  CHESS_CLIENT_ID: '',
  CHESS_CLIENT_SECRET: '',
  // Basic auth is only required for oauth.chess-x.com dev servers
  CHESS_BASIC_AUTH_USERNAME: '',
  CHESS_BASIC_AUTH_PASSWORD: '',

  //#######################################
  //             Database
  //#######################################

  // DEVELOPMENT
  DATABASE_URL:
    'postgres://dev:letmein@localhost:5432/treasurechessplayground?connection_limit=1',

  // Example command:
  // > psql -U dev
  // > CREATE DATABASE treasurechessshadow;
  SHADOW_DATABASE_URL:
    'postgres://dev:letmein@localhost:5432/treasurechessshadow?connection_limit=1',

  REDWOOD_SECURE_SERVICES: 1,
}

module.exports = env
