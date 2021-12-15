const { getExplorerBaseUrlFromName } = require('@treasure-chess/web3-helpers')

const config = {
  explorerBaseUrl: getExplorerBaseUrlFromName(
    process.env.ETHEREUM_NETWORK_NAME
  ),
}

export default config
