import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'

import about from './about'
import faq from './faq'
import { useEffect } from 'react'

const FaqPage = () => {
  useEffect(() => {
    document.body.className = 'chess'

    return function cleanup() {
      setTimeout(() => document.body.classList.remove('chess'), 200)
    }
  }, [])

  return (
    <div>
      <MetaTags title="About" />
      <MetaTags
        title="About"
        description="The what, why, and how of Treasure Chess."
      />
      <FaqSection title="About" questionList={[...about]} columns />
      <FaqSection title="FAQ's" questionList={[...faq]} />
    </div>
  )
}

export default FaqPage
