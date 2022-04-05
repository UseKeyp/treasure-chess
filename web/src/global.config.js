import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'

const config = {
  BLOCK_EXPLORER_BASE_URL: getExplorerBaseUrlFromName(
    process.env.ETHEREUM_NETWORK_NAME
  ),
  CHESS_COM_BASE_URL: 'https://chess.com/',
  HOW_TO_BUY_URL: '', // Link to docs on buying USDC
  DISCORD_URL: 'https://discord.gg/DJD7AC4jtz',
  TWITTER_URL: 'https://twitter.com/treasurechess_',
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
    name: 'Jschiar',
    rating: '1500',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/106292268.1f925d2d.161x161o.f292b345924a@2x.png',
    masterTitle: '',
    country: 'US',
    username: 'Jschiar',
  },
  {
    name: 'Hikaru Nakamura',
    rating: '2950',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/86419862.dd45ef51.200x200o.e929634604ef.jpeg',
    masterTitle: 'GM',
    country: 'US',
    username: 'chefshouse',
  },
  {
    name: 'Tweetious',
    rating: '1070',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/117951316.d1fc130c.160x160o.389ae6711765@2x.png',
    masterTitle: '',
    country: 'GR',
    username: 'tweetious',
  },
  {
    name: 'Marissa Li',
    rating: '1711',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/17782238.cc671fcf.160x160o.5d48062e1c0e@2x.jpeg',
    masterTitle: 'WCM',
    country: 'US',
    username: 'Lightning_Pig',
  },
  {
    name: 'Chadbiryani',
    rating: '2772',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/10547944.c35e0df3.160x160o.f78382e5901f@2x.png',
    masterTitle: 'NM',
    country: 'US',
    username: 'chadbiryani',
  },
]
export default config
