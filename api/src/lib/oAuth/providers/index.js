import { CHESS, provider as chessProvider } from './chess'
import { handleChessLogin } from './chess/login'
import { COINBASE, provider as coinbaseProvider } from './coinbase'
import { PLAID } from './plaid'
import { TWITCH, provider as twitchProvider } from './twitch'

export const providers = {
  [CHESS]: { ...chessProvider, onConnected: handleChessLogin },
  [COINBASE]: coinbaseProvider,
  [TWITCH]: twitchProvider,
}

export const types = { COINBASE, CHESS, TWITCH, PLAID }
