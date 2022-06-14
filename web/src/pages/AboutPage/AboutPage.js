import FaqSection from 'src/components/FaqSection/FaqSection'
import AchievementList from 'src/components/AchievementList/AchievementList'
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
      t(
        'Every game played on Chess.com can be turned into a Treasure. Only one Treasure for each player per game can ever be minted, and only the players can mint them. A Treasure has special attributes, achievements, and a level. Treasures can be bought and sold in our Marketplace.'
      ),
    ],
    [
      t('What do I need to get started?'),
      t('All you need is a Chess.com account.'),
    ],

    [
      t("How is a Treasure's level calculated?"),
      t(
        'Each Treasure has a level: Good, Great, Ultra, or Mythic. The level is calculated automatically based on the achievements earned. Do something amazing, like take all of your opponents pawns without losing any, and you will be on your way to a Mythic Treasure.'
      ),
    ],

    [
      t('Who decides the achievements?'),
      t(
        'There are currently 36 achievements in Treasure Chess. Who will be the first to earn them all (send us a message if you have)? We hope to add dozens and dozens more, using feedback and suggestions from the community. In the future there could even be a way to vote on what achievements are added to Treasure Chess.'
      ),
    ],

    [
      t('What are the costs for Treasure Chess?'),
      t(
        'We promise to always be completely transparent with costs. We take a $5 fee for each Treasure that gets minted, paid only with debit cards. We also take a 5% fee on all secondary Marketplace sales, and give another 5% to the Treasures original minter. We will add the ability to use money earned in the Marketplace for minting new Treasures soon.'
      ),
    ],

    [
      t(
        'Is there any limit to how much I can earn on the marketplace in secondary sale fees?'
      ),
      t(
        'There are no limits to any user earnings. Fees are paid directly to your Treasure Chess account balance from the marketplace.'
      ),
    ],
    [
      t('Who decides the prices of Treasures in the Marketplace?'),
      t('All prices in the marketplace are set by users, not by us.'),
    ],

    [
      t('How do I fund my account to buy Treasures in the Marketplace?'),
      t(
        'On your profile page there is a deposit button for funding your account using a debit card. Advanced users may also fund their accounts directly, using USDC tokens only on the Polygon network.'
      ),
    ],

    [
      t('Can I transfer my Treasures to someone else?'),
      t(
        'You can send Treasures at any time to other Treasure Chess users. Transferring Treasures to external accounts is under development and will be added shortly.'
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
      t('What is the environmental impact of Treasure Chess?'),
      t(
        'Creating new Treasures uses an equivalent amount of electricity as a search engine query, or sending a few emails. We are proud of our technology and networks, and how efficient they are.'
      ),
    ],

    [
      t('What if I have another question?'),
      t(
        'Let us know! Treasure Chess is a living product and community. We want to help answer your questions and improve Treasure Chess.'
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

  return (
    <div>
      <MetaTags title={t('About')} />
      <MetaTags
        title={t('About')}
        description={t('The what, why, and how of Treasure Chess.')}
      />
      <FaqSection title="About" questionList={[...about]} columns />

      <div className="mt-4 m-auto w-full max-w-2xl">
        <h2 className="text-4xl font-black">{t('Achievements')}</h2>
        <div className="mt-5">
          <AchievementList
            title=""
            bgColor="#312E2B"
            fgColor="rgb(255 255 255 / 0.05)"
          />
        </div>
      </div>

      <FaqSection title="FAQ's" questionList={[...faqs]} />
    </div>
  )
}

export default FaqPage
