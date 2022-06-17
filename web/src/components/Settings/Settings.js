import { useAuth } from '@redwoodjs/auth'
import ModalContainer from 'src/components/ModalContainer'
import Button from 'src/components/Button'

import { useModal } from 'src/hooks/useModal'
import Dropdown from 'src/components/Dropdown/Dropdown'
import { languageData } from '@treasure-chess/localization'
import { isBrowser } from 'src/utils/helpers'
import { toast } from '@redwoodjs/web/toast'
import { useLocale } from 'src/providers/locale/locale'

const Settings = () => {
  const { isVisible: isVisibleBeta, toggleModal: toggleModalBeta } = useModal()
  const { currentUser } = useAuth()

  const getLocaleCode = () => {
    if (!isBrowser) return // Support prerender
    return localStorage.getItem('i18nextLng')
  }

  const { setLocale } = useLocale()
  const [defaultLocale] = React.useState(getLocaleCode())
  const [localeError, setLocaleError] = React.useState('')
  const [matchedLocale, _setMatchedLocale] = React.useState(getMatchedLocale())

  function setMatchedLocale(newLocale) {
    if (newLocale) {
      const matched = languageData.find((lang) => lang.value === newLocale)
      localStorage.setItem(
        'i18nextLng',
        matched.id.toString() + '-' + matched.region.toString()
      )
      _setMatchedLocale(matched.value)
      try {
        setLocale(matched.id.toString() + '-' + matched.region.toString())
        toast.success('Changes saved')
      } catch (e) {
        setLocaleError(e.message)
      }
    } else {
      const fallbackLocale = languageData.find(
        (lang) => lang.id + '-' + lang.region === defaultLocale
      )
      localStorage.setItem(
        'i18nextLng',
        fallbackLocale.id.toString() + '-' + fallbackLocale.region.toString()
      )
      _setMatchedLocale(fallbackLocale.value)
    }
  }

  function getMatchedLocale() {
    const matchedLocale = languageData.find(
      (lang) => lang.id + '-' + lang.region === defaultLocale
    )
    return matchedLocale.value
  }

  if (!currentUser) {
    return <></>
  }

  const items = [
    {
      title: 'Subscribe to Updates',
      hideButton: true,
      description: (
        <div className="">
          <iframe
            src={`https://mautic.tools.treasurechess.com/form/1?username=${currentUser.username}`}
            className="max-w-[500px] w-full"
            height="175"
            title="Subscribe form"
            scrolling="no"
            frameBorder="0"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      ),
    },
    {
      title: 'Share Feedback',
      hideButton: true,
      description: (
        <div className="flex align-start items-start justify-start">
          <iframe
            src={`https://mautic.tools.treasurechess.com/form/3?username1=${currentUser.username}`}
            height="220"
            className="max-w-[500px] w-full"
            title="Feedback form"
            scrolling="no"
            frameBorder="0"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      ),
    },
    {
      title: 'Beta Access',
      description: <p>Preview new features before they are released.</p>,
      button: (
        <Button
          variant="blue"
          size="small"
          className="w-32"
          onClick={toggleModalBeta}
        >
          {t('Request')}
        </Button>
      ),
      status: (
        <p>
          <i>{currentUser.betaAccess ? 'Enabled' : 'Disabled'}</i>
        </p>
      ),
      highlight: currentUser.betaAccess,
    },
  ]

  return (
    <div className="max-width-container">
      <h1>{'Settings'}</h1>

      <div className="">
        {items.map((item) => (
          <div
            key={item.title}
            className={`grid ${
              item.hideButton ? 'grid-cols-1' : 'grid-cols-2'
            } align-center gap-4 bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
              item.highlight ? 'border-green' : 'border-chessBlack-100'
            }`}
          >
            <div className="">
              <div className="flex align-center items-center">
                {item.iconContent || <h3>{item.title}</h3>}
              </div>
              {item.description && (
                <div className="mt-2">{item.description}</div>
              )}
              {item.status && <div className="mt-4">{item.status}</div>}
              {item.errorText && (
                <div className="mt-4 font-bold text-errorYellow">
                  {item.errorText}
                </div>
              )}
              {item.helperText && <div className="mt-3">{item.helperText}</div>}
            </div>
            {!item.hideButton && item.button && (
              <div className="flex justify-end ">
                <div>{item.button}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ModalContainer
        isVisible={isVisibleBeta}
        hideModal={toggleModalBeta}
        headerText="Request Beta Access"
        content={
          <div className="p-4 rounded-lg bg-chessBlack-100">
            <iframe
              title="Request Beta Access"
              src={`https://mautic.tools.treasurechess.com/form/2?username1=${currentUser.username}`}
              width="100%"
              height="500"
            >
              <p>Your browser does not support iframes.</p>
            </iframe>
          </div>
        }
      />
      <div className="p-4 mt-6 rounded-lg bg-chessBlack-100">
        <div className="flex flex-col">
          <div className="text-sm">Language</div>
        </div>
        <div className="mt-2">
          <Dropdown
            category={'Change your preferred language'}
            default={defaultLocale}
            options={languageData.sort().map((lang) => lang.value)}
            queryFilterFunction={setMatchedLocale}
            queryFilter={matchedLocale}
          />
        </div>
        <div className="text-errorYellow text-sm mt-2">{localeError}</div>
      </div>
    </div>
  )
}

export default Settings
