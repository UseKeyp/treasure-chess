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
  SUPPORT_URL: '',
}

export const featuredPlayers = [
  {
    name: 'Danny Rensch',
    rating: '2500',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/4317.e9dc54f0.160x160o.b759b9aa64e8@2x.jpeg',
    masterTitle: 'IM',
    country: 'US',
    username: 'Danny',
  },
  {
    name: 'Joseph Schiarizzi',
    rating: '1500',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/106292268.1f925d2d.161x161o.f292b345924a@2x.png',
    masterTitle: '',
    country: 'US',
    username: 'Jschiar',
  },
  {
    name: 'Alexandra Botez',
    rating: '2059',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/7064c138-1af7-11eb-b69b-0371950d641f.8e25e027.250x250o.135a8cc20161@2x.jpeg',
    masterTitle: 'WFM',
    country: 'CA',
    username: 'alexandra-botez',
  },
  {
    name: 'Levy Rozman',
    rating: '2333',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/master_player/de4c8970-1fa1-11eb-b085-f9083b57b9d8.09ceeeff.250x250o.0401a269c1c9@2x.jpeg',
    masterTitle: 'IM',
    country: 'US',
    username: 'levy-rozman',
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
    name: 'Aakaash Meduri',
    rating: '2772',
    imageSrc:
      'https://images.chesscomfiles.com/uploads/v1/user/10547944.c35e0df3.160x160o.f78382e5901f@2x.png',
    masterTitle: 'NM',
    country: 'US',
    username: 'chadbiryani',
  },
]
export default config
