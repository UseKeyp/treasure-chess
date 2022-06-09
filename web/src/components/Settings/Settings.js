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
      title: 'Beta Access',
      description: 'Preview new features before they are released.',
      button: (
        <Button variant="blue" size="small" onClick={toggleModalBeta}>
          Request
        </Button>
      ),
      status: currentUser.betaAccess ? 'Enabled' : 'Disabled',
      highlight: currentUser.betaAccess,
    },
    {
      title: 'Feedback',
      description: (
        <div className="flex align-start">
          <iframe
            src={`https://mautic.tools.treasurechess.com/form/3?username=${currentUser.username}`}
            width="500"
            height="300"
            title="Feedback form"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      ),
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
              {item.status && <p className="mt-4">{item.status}</p>}
              {item.errorText && (
                <div className="mt-4 font-bold text-errorYellow">
                  {item.errorText}
                </div>
              )}
              {item.helperText && (
                <p className="mt-3 italic">{item.helperText}</p>
              )}
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
              src={`https://mautic.tools.treasurechess.com/form/2?username=${currentUser.username}`}
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
