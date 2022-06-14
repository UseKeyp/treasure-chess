import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import { useTheme } from 'src/providers/theme'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

import { useEffect } from 'react'

const SupportPage = () => {
  const { toggleFaqTheme } = useTheme()

  useEffect(() => {
    toggleFaqTheme(true)
    return function cleanup() {
      toggleFaqTheme(false)
    }
  })

  React.useEffect(() => {
    if (isBrowser) {
      if (!window.$chatwoot?.hasLoaded) return
      window.$chatwoot?.toggleBubbleVisibility('show')
    }
  }, [])

  const supportText = (
    <>
      <Trans i18nKey="web:supportHelpArea">
        Feel free to reach out for questions or support at{' '}
        <a
          className="underline"
          href="mailto:support@treasurechess.com"
          target="_blank"
          rel="noreferrer"
        >
          support@treasurechess.com
        </a>
      </Trans>
    </>
  )

  const supportContent = [
    [
      t('Questions or need help?'),
      t(
        'Use the chat widget at the bottom right for quick questions and troubleshooting.'
      ),
      '🤔',
      true,
    ],
    [t('Have a request?'), supportText, '📨'],
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
