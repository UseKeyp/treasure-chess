import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import { useTheme } from 'src/providers/theme'

import { useEffect } from 'react'

const SupportPage = () => {
  const { toggleFaqTheme } = useTheme()

  useEffect(() => {
    toggleFaqTheme(true)
    return function cleanup() {
      toggleFaqTheme(false)
    }
  })

  const supportLink = (
    <>
      <a href="https://support.chess.com/" target="_blank" rel="noreferrer">
        https://support.chess.com/
      </a>
    </>
  )

  const supportText = [
    t(
      'Feel free to reach out for questions or support. We are always happy to help! You can get in touch with us at '
    ),
    supportLink,
  ]

  const supportContent = [
    [
      // [0] = title
      t('How can we help?'),
      // [1] = answer
      supportText,
      // [2] = icon
      '🛠️ ',
      // [3] = featured
      true,
    ],
  ]

  return (
    <div>
      <MetaTags title={t('Support')} />
      <MetaTags
        title={t('Support')}
        description={t('Contact us for questions or support.')}
      />
      <FaqSection title="Support" questionList={[...supportContent]} />
    </div>
  )
}

export default SupportPage
