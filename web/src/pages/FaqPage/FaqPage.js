import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import { useTheme } from 'src/providers/theme'

import about from './about'
import faq from './faq'
import { useEffect } from 'react'

const FaqPage = () => {
  const { toggleFaqTheme } = useTheme()

  useEffect(() => {
    toggleFaqTheme(true)
    return function cleanup() {
      toggleFaqTheme(false)
    }
  })

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
