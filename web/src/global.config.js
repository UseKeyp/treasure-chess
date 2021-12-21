import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'

const config = {
  BLOCK_EXPLORER_BASE_URL: getExplorerBaseUrlFromName(
    process.env.ETHEREUM_NETWORK_NAME
  ),
  CHESS_COM_BASE_URL: 'https://chess.com/',
  HOW_TO_BUY_URL: '', // Link to docs on buying USDC
  DISCORD_URL: '',
  BLOG_URL: '',
  TOC_URL: '',
  PRIVACY_POLICY_URL: '',
  SUPPORT_URL: '',
}

export default config
