import { useAuth } from '@redwoodjs/auth'
import ModalContainer from 'src/components/ModalContainer'
import Button from 'src/components/Button'

import { useModal } from 'src/hooks/useModal'

const Settings = () => {
  const { isVisible: isVisibleBeta, toggleModal: toggleModalBeta } = useModal()
  const { currentUser } = useAuth()
  if (!currentUser) {
    return <></>
  }

  const items = [
    {
      title: 'Subscribe to Updates',
      description: (
        <div className="flex align-start">
          <iframe
            src={`https://mautic.tools.treasurechess.com/form/1?username=${currentUser.username}`}
            width="500"
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
      description: (
        <div className="flex align-start">
          <iframe
            src={`https://mautic.tools.treasurechess.com/form/3?username1=${currentUser.username}`}
            width="500"
            height="220"
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
      description: 'Preview new features before they are released.',
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
            className={`grid grid-cols-4 gap-4 align-center  bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
              item.highlight ? 'border-green' : 'border-chessBlack-100'
            }`}
          >
            <div className="col-span-3">
              <div className="flex align-center items-center">
                {item.iconContent || <h3>{item.title}</h3>}
              </div>
              {item.description && <p className="mt-2">{item.description}</p>}
              {item.status && <div className="mt-4">{item.status}</div>}
              {item.errorText && (
                <div className="mt-4 font-bold text-errorYellow">
                  {item.errorText}
                </div>
              )}
              {item.helperText && <div className="mt-3">{item.helperText}</div>}
            </div>
            {!item.hideButton && item.button && (
              <div className="flex justify-center">
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
    </div>
  )
}

export default Settings
