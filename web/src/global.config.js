import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'

const config = {
  explorerBaseUrl: getExplorerBaseUrlFromName(
    process.env.ETHEREUM_NETWORK_NAME
  ),
  chessComBaseUrl: 'https://chess.com/',
  howToBuyUrl: '', // Link to docs on buying USDC
}

export default config
