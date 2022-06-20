import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import globalConfig from 'src/global.config'
import Icon from 'src/components/Icon'

const SupportPage = () => {
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
      t('Questions and Help'),
      t(
        'Use the chat widget at the bottom right for quick questions and troubleshooting.'
      ),
      '🤔',
      true,
    ],
    [
      t('Community Chat'),
      <Trans key="communityChatSupport" i18nkey="web:communityChatSupport">
        Join our{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className="underline"
          href={globalConfig.DISCORD_URL}
        >
          Discord Server
        </a>{' '}
        to ask questions and hang out with the community.
      </Trans>,
      <Icon key="discord" name="discord" size="20px" />,
    ],
    [t('Have a request?'), supportText, '📨'],
  ]

  return (
    <div>
      <MetaTags
        title={t('Support')}
        description={t('Contact us for questions or support.')}
      />
      <FaqSection title="Support" questionList={[...supportContent]} />
    </div>
  )
}

export default SupportPage
