import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'

import about from './about'
import faq from './faq'

const different = [
  {
    question: (
      <>
        <span className="mr-2">❤️</span> 100% of primary sales goes directly to
        players
      </>
    ),
    answer:
      "Secondary sales: 90% seller / 5% player / 5% platform. We're here to support the Chess community.",
  },
  {
    question: (
      <>
        <span className="mr-2">🌱</span> Environmentally friendly
      </>
    ),
    answer: 'Less energy consumed than playing a game of chess online.',
  },
  {
    question: (
      <>
        <span className="mr-3">🌞</span>
        Keep it fun
      </>
    ),
    answer:
      'Support the players and creator you love. Speculation is limited by a $100 maximum deposit.',
  },
]

const FaqPage = () => {
  return (
    <div style={{ maxWidth: '85%', margin: 'auto' }}>
      <MetaTags title="About" />
      <MetaTags
        title="About"
        description="The what, why, and how of Treasure Chess."
      />
      <FaqSection title="About" questionList={[...different, ...about]} />
      <FaqSection title="FAQ's" questionList={faq} />
    </div>
  )
}

export default FaqPage
