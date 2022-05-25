import config from 'src/global.config'

const about = [
  [
    // [0] = title
    t('Story time'),
    // [1] = answer
    t(
      'Long ago, some people much smarter than us created the beautiful game of chess. It has evolved in many ways since then, but many things have stayed the same: our favorite games are often lost to time, you can’t make a living from games of chess you’ve already played, and it’s difficult to show off your achievements when the result boils down to a win or loss. With those issues in mind, a small team of chess lovers set out to create a new way for fans to engage with chess streamers, to make unique games of chess more permanent than ever before, and create a new mini-game around achievements within chess.'
    ),
    // [2] = icon
    '👋',
    // [3] = featured
    true,
  ],
  [
    t('Documentation'),
    <>
      Looking for a deeper dive on how Treasure Chess works? Check out our{' '}
      <a href={config.GITHUB_URL}>GitHub</a> for more details.
    </>,
    '📚',
  ],
  [
    t('Keep it fun'),
    t(
      'We built Treasure Chess so you can support the players and creators you love, as well as cherish your own games with friends.'
    ),
    '🌞',
  ],
  [
    t('100% of primary sales go directly to players'),
    t(
      'Secondary sales are split 90% seller / 5% original player / 5% platform. Our goal is to support the Chess community.'
    ),
    '❤️',
  ],
  [
    t('Environmentally friendly'),
    t('Minting Treasures consumes less energy than sending an email.'),
    '🌱',
  ],
]
export default about
