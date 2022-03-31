import {
  COINBASE,
  COINBASE_OAUTH_URL_AUTHORIZE,
  coinbaseParams,
  getCoinbaseAccessTokenFromCode,
  handleCoinbaseLogin,
} from './coinbase'
import {
  WYRE,
  WYRE_OAUTH_URL_AUTHORIZE,
  wyreParams,
  getWyreAccessTokenFromCode,
  handleWyreLogin,
} from './coinbase'

export const providers = {
  [COINBASE]: {
    urlAuthorize: COINBASE_OAUTH_URL_AUTHORIZE,
    params: coinbaseParams,
    onSubmitCode: getCoinbaseAccessTokenFromCode,
    onLogin: handleCoinbaseLogin,
  },
  [WYRE]: {
    urlAuthorize: WYRE_OAUTH_URL_AUTHORIZE,
    params: wyreParams,
    onSubmitCode: getWyreAccessTokenFromCode,
    onLogin: handleWyreLogin,
  },
}

export const types = {
  COINBASE,
}
