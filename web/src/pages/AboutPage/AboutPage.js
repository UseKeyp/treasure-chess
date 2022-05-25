import FaqSection from 'src/components/FaqSection/FaqSection'
import AchievementList from 'src/components/AchievementList/AchievementList'
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

      <FaqSection title="FAQ's" questionList={[...faq]} />
    </div>
  )
}

export default FaqPage
