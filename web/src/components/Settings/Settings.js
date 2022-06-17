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
    </div>
  )
}

export default Settings
