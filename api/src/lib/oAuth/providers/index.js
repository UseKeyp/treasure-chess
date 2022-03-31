import { CHESS, provider as chessProvider } from './chess'
import { handleChessLogin } from './chess/login'
import { COINBASE, provider as coinbaseProvider } from './coinbase'
// import {
//   PLAID,
// provider as plaidProvider
// } from './plaid'
// import {
//   WYRE,
//   provider as wyreProvider
// } from './wyre'
// import {
//   TWITCH,
//   provider as twitchProvider
// } from './twitch'

export const providers = {
  [CHESS]: {
    ...chessProvider,
    onLogin: handleChessLogin,
  },
  [COINBASE]: coinbaseProvider,
  // [PLAID]: plaidProvider,
  // [WYRE]:wyreProvider,
  // [TWITCH]: twitchProvider,
}

export const types = {
  COINBASE,
  CHESS,
  // WYRE,
  // TWITCH,
  // PLAID,
}
