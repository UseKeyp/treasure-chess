import FaqSection from 'src/components/FaqSection/FaqSection'
import AchievementList from 'src/components/AchievementList/AchievementList'
import Table from 'src/components/Table'
import { MetaTags } from '@redwoodjs/web'
import { useTheme } from 'src/providers/theme'
import config from 'src/global.config'

import { useEffect } from 'react'

const FaqPage = () => {
  const { toggleFaqTheme } = useTheme()

  useEffect(() => {
    toggleFaqTheme(true)
    return function cleanup() {
      toggleFaqTheme(false)
    }
  })

  const faqs = [
    [
      t('What is Treasure Chess?'),
      t(
        'Treasure Chess is an app that lets you save, collect, and trade games of chess by saving them as Treasures (a type of digital item you own). '
      ),
    ],
    [
      t('What are Treasures?'),
      <Trans key="whatAreTreasures" i18nkey="web:whatAreTreasures">
        Every game played on Chess.com can be turned into a Treasure. Only one
        Treasure per game per player can ever be minted. There can never be more
        than 2 Treasures for a game, and only the players can mint them.
        <br />
        <br /> A Treasure has special attributes, achievements, and a level.
        Treasures can be bought and sold in our Marketplace (other marketplaces
        coming soon).
      </Trans>,
    ],
    [
      t('What do I need to get started?'),
      t('All you need is a Chess.com account.'),
    ],
    [
      t('🪙 What are the costs?'),
      t(
        "We promise to always be completely transparent. We charge $5 for minting Treasures, paid only with debit cards. We also take a 5% fee on Marketplace sales, and give another 5% to the Treasure's original minter."
      ),
    ],
    [
      t('Is there a limit to how much I can earn?'),
      t(
        'There are no limits to any user earnings. Earnings are paid directly to your Treasure Chess wallet balance from the marketplace.'
      ),
    ],
    [
      t('🎁 Who decides the prices of Treasures in the Marketplace?'),
      <Trans
        key="marketplacePriceDecision"
        i18nkey="web:marketplacePriceDecision"
      >
        All prices in the marketplace are set by users, not by us.{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className="underline"
          href="https://blog.treasurechess.com/p/share-your-treasures?s=w"
        >
          See more
        </a>
      </Trans>,
    ],

    [
      t('How do I fund my wallet to buy Treasures in the Marketplace?'),
      t(
        'On your profile page there is a deposit button for funding your wallet using a debit card. Advanced users may also fund their wallet directly.'
      ),
    ],
    [
      t('📬 Can I transfer my Treasures to someone else?'),
      t(
        'Sending Treasures to other Treasure Chess users, and to external wallets is under development and will be added shortly.'
      ),
    ],
    [
      t(
        'Can I bring a Treasure to other marketplaces outside of Treasure Chess?'
      ),
      t(
        'Once external transfers are supported, you will be able to send Treasures to any wallet you own.'
      ),
    ],
    [
      t('🌱 What is the environmental impact of Treasure Chess?'),
      <Trans key="environmentalImpact" i18nkey="web:environmentalImpact">
        Creating new Treasures uses an equivalent amount of electricity as a
        search engine query, or sending a few emails. We are proud of our
        technology and networks, and how efficient they are. See how we{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className="underline"
          href="https://blog.treasurechess.com/p/treasure-chess-and-energy-"
        >
          made this possible.
        </a>
      </Trans>,
    ],
    [
      t('What if I have another question?'),
      t(
        'Let us know using the support page! Treasure Chess is a living product and community. We want to help answer your questions and improve Treasure Chess.'
      ),
    ],
  ]

  const about = [
    [
      // [0] = title
      t('Story time'),
      // [1] = answer
      t(
        'Long ago, some people much smarter than us created the beautiful game of chess. It has evolved in many ways since then, but many things have stayed the same: our favorite games are often lost to time, you can’t make a living from games of chess you’ve already played, and it’s difficult to show off your achievements when the result boils down to a win or loss. With those issues in mind, a small team of chess lovers set out to create a new way for fans to engage with chess streamers, to make unique games of chess more permanent than ever before, and create a new mini-game around achievements within chess.'
      ),
      // [2] = icon
      '📚',
      // [3] = featured
      true,
    ],
    [
      t('Here for Fun'),
      t(
        'We built Treasure Chess so you can support the players you love, and cherish your own games between friends.'
      ),
      '😄',
    ],
    [
      t('95% Goes to You!'),
      <Trans key="95GoesToYou" i18nkey="web:95GoesToYou">
        We&apos;re only successful when the Chess Community is.
        <ul>
          <li> First sale: 95% minter / 5% platform</li>
          <li>
            Additional sales: 90% seller / 5% original player / 5% platform
          </li>
        </ul>
        <a
          target="_blank"
          rel="noreferrer"
          className="underline"
          href="https://blog.treasurechess.com/p/share-your-treasures?s=w"
        >
          Learn more
        </a>{' '}
      </Trans>,

      '💵',
    ],
    [
      t('Environmentally friendly'),
      <Trans
        key="environmentallyFriendly"
        i18nkey="web:environmentallyFriendly"
      >
        We're not like others web3 apps. Minting Treasures consumes less energy
        than sending an email. See how we{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className="underline"
          href="https://blog.treasurechess.com/p/treasure-chess-and-energy-"
        >
          made this possible.
        </a>
      </Trans>,
      '🌱',
    ],
  ]

  const getLevelRow = (level, points) => {
    let bgColor = 'bg-rarity-good'
    if (level === 'Great') bgColor = 'bg-rarity-great'
    if (level === 'Ultra') bgColor = 'bg-rarity-ultra'
    if (level === 'Mythic') bgColor = 'bg-rarity-mythic'

    return [
      {
        text: (
          <div
            className={`flex w-[200px] align-center justify-center ${bgColor} rounded-full p-2`}
          >
            <h3 className="font-bold color-white">{level}</h3>
          </div>
        ),
        style: { display: 'flex', justifyContent: 'center' },
      },
      { text: points, style: { display: 'flex', justifyContent: 'center' } },
    ]
  }
  const levelTableData = [
    getLevelRow('Good', '1 - 5 Points'),
    getLevelRow('Great', '6 - 10 Points'),
    getLevelRow('Ultra', '11 - 14 Points'),
    getLevelRow('Mythic', '15+ Points'),
  ]
  return (
    <div>
      <MetaTags
        title={t('About')}
        description={t('The what, why, and how of Treasure Chess.')}
      />
      <FaqSection title="About" questionList={[...about]} columns />
      <div className="mt-10 m-auto w-full max-w-2xl">
        <h2 className="text-4xl font-black">🏅 {t('Levels')}</h2>
        <div className="mt-4">
          <Table
            data={levelTableData}
            bgColor="#312E2B"
            rowWidth="200px"
            fgColor="rgb(255 255 255 / 0.05)"
          />
        </div>
        <div className="mt-4">
          <FaqSection
            questionList={[
              [
                t('How are levels calculated?'),
                t(
                  'Levels are calculated automatically based on the achievements earned. Do something amazing, like take all of your opponents pawns without losing any, and you will be on your way to a Mythic Treasure.'
                ),
              ],
            ]}
          />
        </div>
        <h2 className="text-4xl mt-12  font-black">🎯 {t('Achievements')}</h2>
        <div className="mt-4">
          <AchievementList
            title=""
            bgColor="#312E2B"
            fgColor="rgb(255 255 255 / 0.05)"
          />
        </div>
        <div className="mt-4">
          <FaqSection
            questionList={[
              [
                t('Who decides Achievements?'),
                t(
                  'There are currently 36 achievements. Who will be the first to earn them all? (send us a message if you have) We hope to add dozens more, using feedback and suggestions from the community. In the future there could even be a way to vote on what achievements are added to Treasure Chess.'
                ),
              ],
            ]}
          />
        </div>
      </div>
      <div className="mt-8">
        <FaqSection title={<>❓ {t("FAQ's")}</>} questionList={[...faqs]} />
      </div>
      <div className="mt-4">
        <FaqSection
          title={<>🛠️ {t('For Developers')}</>}
          questionList={[
            [
              t('Can I build with Treasure Chess?'),
              <Trans key="forDevelopers" i18nkey="web:forDevelopers">
                Almost all of our code & tooling is open source. Analytics,
                bots, and wallet integrations are all things that we'd love to
                help you build. Check out our{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                  href={config.GITHUB_URL}
                >
                  GitHub
                </a>{' '}
                for more details, and get in touch with us. Happy building!
              </Trans>,
            ],
          ]}
        />
      </div>
    </div>
  )
}

export default FaqPage
