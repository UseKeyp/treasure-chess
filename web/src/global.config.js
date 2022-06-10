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
  BLOG_URL: 'http://blog.treasurechess.com/',
  TOC_URL: '/terms',
  PRIVACY_POLICY_URL: '/privacy',
  SUPPORT_URL: '/support',
}

export const featuredPlayers = [
  {
    name: 'Aristotelis S.',
    rating: '2190',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/140386997.369cceeb.200x200o.13519e7e6470.jpeg',
    masterTitle: '',
    country: 'GR',
    username: 'chessbutgreek',
  },
  {
    name: 'Marissa Li',
    rating: '1711',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/17782238.cc671fcf.160x160o.5d48062e1c0e@2x.jpeg',
    masterTitle: 'WCM',
    country: 'US',
    username: 'lightning_pig',
  },
  {
    name: 'Joseph Schiarizzi',
    rating: '1500',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/106292268.1f925d2d.161x161o.f292b345924a@2x.png',
    masterTitle: '',
    country: 'US',
    username: 'jschiar',
  },
  {
    name: 'Aakaash Meduri',
    rating: '2772',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/10547944.c35e0df3.160x160o.f78382e5901f@2x.png',
    masterTitle: 'NM',
    country: 'US',
    username: 'chadbiryani',
  },
  {
    name: 'Chanelno5x',
    rating: '860',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/97796764.7e5e99ad.160x160o.87d8ccbf822d@2x.jpeg',
    masterTitle: '',
    country: 'US',
    username: 'chanelno5x',
  },
]
export default config

// {
//   name: 'Joshua Lapidus',
//   rating: '1426',
//   imageSrc:
//   'https://images.chesscomfiles.com/uploads/v1/user/19572800.98021cbe.160x160o.94f2d23c2b99@2x.png',
//   masterTitle: '',
//   country: 'US',
//   username: '0xjoshua',
// },
// {
//   name: 'Danny Rensch',
//   rating: '2500',
//   imageSrc:
//     'https://images.chesscomfiles.com/uploads/v1/user/4317.e9dc54f0.160x160o.b759b9aa64e8@2x.jpeg',
//   masterTitle: 'IM',
//   country: 'US',
//   username: 'danny',
// },
// {
//   name: 'Justus Williams',
//   rating: '2510',
//   imageSrc: 'https://i.imgur.com/dpxmBHB.png',
//   masterTitle: 'FM',
//   country: 'US',
//   username: 'jwillz14',
// },
