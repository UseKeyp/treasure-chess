import config from 'src/global.config'

const about = [
  [
    // [0] = title
    'Who',
    // [1] = answer
    'Long ago, some people much smarter than us created the beautiful game of chess. It has evolved in many ways since then, but many things have stayed the same: our favorite games are often lost to time, you can’t make a living from games of chess you’ve already played, and it’s difficult to show off your achievements when the result boils down to a win or loss. With those issues in mind, a small team of chess lovers set out to create a new way for fans to engage with chess streamers, to make unique games of chess more permanent than ever before, and create a new mini-game around achievements within chess.',
    // [2] = icon
    '👋',
    // [3] = featured
    true,
  ],
  [
    'Documentation',
    <>
      Looking for a deeper dive on how Treasure Chess works? Check out our{' '}
      <a href={config.GITHUB_URL}>GitHub</a> for more details.
    </>,
    '📚',
  ],
  [
    '100% of primary sales goes directly to players',
    "Secondary sales: 90% seller / 5% player / 5% platform. We're here to support the Chess community.",
    '❤️',
  ],
  [
    'Less energy consumed than playing a game of chess online.',
    'Minting cards consumes less energy than playing a game of chess online.',
    '🌱',
  ],
  [
    'Keep it fun',
    'Support the players and creator you love. Speculation is limited by a $100 maximum deposit.',
    '🌞',
  ],
]
export default about
