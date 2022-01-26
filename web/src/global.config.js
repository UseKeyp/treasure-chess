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

export const players = [
  {
    name: 'Hikaru Nakamura',
    masterTitle: 'GM',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/15448422.90503d66.160x160o.269b19895ab0.jpeg',
    url: '/treasures?username=hikaru',
    rating: 3218,
    country: 'US',
  },
  {
    name: 'Alexandra Botez',
    masterTitle: 'IM',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/28583276.26b0cd3b.160x160o.fcbeec9a680e.jpeg',
    url: '/treasures?username=alexandrabotez',
    rating: 2244,
    country: 'US',
  },
  {
    name: 'Maurice Ashley',
    masterTitle: 'GM',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/9194996.d712e3ce.160x160o.86f7fd01bf97.jpg',
    url: '/treasures?username=gmashley',
    rating: 2368,
    country: 'US',
  },
  {
    name: 'Eric Hansen',
    masterTitle: 'GM',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/1647368.72a2daa7.160x160o.05329203c4c9.gif',
    url: '/treasures?username=erichansen',
    rating: 2986,
    country: 'US',
  },
  {
    name: 'Maurice Ashley',
    masterTitle: 'GM',
    imageSrc:
      'https://external-preview.redd.it/PBRzWyhmbC9m_N4P4po00yTtoebm709FWxdQvzsDqb0.jpg?auto=webp&s=0e7975b8befe0d64682258445fa4e9669fcf2987',
    url: '/treasures?username=gmashley',
    rating: 2368,
    country: 'US',
  },
  {
    name: 'Alexandra Botez',
    masterTitle: 'IM',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/28583276.26b0cd3b.160x160o.fcbeec9a680e.jpeg',
    url: '/treasures?username=alexandrabotez',
    rating: 2244,
    country: 'US',
  },
  {
    name: 'Eric Hansen',
    masterTitle: 'GM',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/1647368.72a2daa7.160x160o.05329203c4c9.gif',
    url: '/treasures?username=erichansen',
    rating: 2986,
    country: 'US',
  },
]
export default config
