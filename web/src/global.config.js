import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'

const config = {
  BLOCK_EXPLORER_BASE_URL: getExplorerBaseUrlFromName(
    process.env.ETHEREUM_NETWORK_NAME
  ),
  CHESS_COM_BASE_URL: 'https://chess.com/',
  HOW_TO_BUY_URL: '', // Link to docs on buying USDC
  DISCORD_URL: '',
  GITHUB_URL: 'https://github.com/treasure-chess',
  BLOG_URL: '',
  TOC_URL: '/terms',
  PRIVACY_POLICY_URL: '/privacy',
  SUPPORT_URL: '',
}

export const featuredPlayers = [
  {
    name: 'Magnus Carlsen',
    rating: 2865,
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/3b0ddf4e-bd82-11e8-9421-af517c2ebfed.3ea0e292.160x160o.bcc8fdc32021@2x.jpeg',
    masterTitle: 'GM',
    country: 'NO',
    username: 'MagnusCarlsen',
  },
  {
    name: 'Alireza Firouzja',
    rating: '2804',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/1c5b7992-3ddf-11ea-9e48-b932e6f44795.541c8641.160x160o.3f0df33bd4bb.png',
    masterTitle: 'GM',
    country: 'FR',
    username: 'firouzja2003',
  },
  {
    name: 'Ding Liren',
    rating: '2799',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/00ffadde-d6a8-11e8-bdb9-933b839db343.c693ec2d.160x160o.5015d8cb0fba.png',
    masterTitle: 'GM',
    country: 'CN',
    username: 'chefshouse',
  },
  {
    name: 'Fabiano Caruana',
    rating: '2792',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/c66cb17a-c005-11e8-886b-692f3468f8e7.e1fe5773.160x160o.27a365c95467.jpeg',
    masterTitle: 'GM',
    country: 'US',
    username: 'fabianocaruana',
  },
  {
    name: 'Anish Giri',
    rating: '2772',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/93222764-bd80-11e8-b51a-fd14c22a36df.a931527c.160x160o.a0852c56a701.jpeg',
    masterTitle: 'GM',
    country: 'NL',
    username: 'anishgiri',
  },
  {
    name: 'Wesly So',
    rating: '2772',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/d1da994a-c00b-11e8-ae3d-67e3121970db.0ffa8f0a.160x160o.7ed711a1126c.jpeg',
    masterTitle: 'GM',
    country: 'US',
    username: 'gmwso',
  },
]
export default config
