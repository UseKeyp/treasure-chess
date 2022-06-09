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
  ]

  return (
    <div className="max-width-container">
      <h1>{'Settings'}</h1>

      <div className="grid grid-rows-2">
        {items.map((item) => (
          <div
            key={item.title}
            className={`grid grid-cols-2 align-center gap-4  bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
              item.highlight ? 'border-green' : 'border-chessBlack-100'
            }`}
          >
            <div>
              <div className="flex align-center items-center">
                {item.iconContent || <h3>{item.title}</h3>}
              </div>
              {item.description && <p className="mt-2">{item.description}</p>}
              <p className="mt-4">{item.status}</p>
              {item.errorText && (
                <div className="mt-4 font-bold text-errorYellow">
                  {item.errorText}
                </div>
              )}
              {item.helperText && (
                <p className="mt-3 italic">{item.helperText}</p>
              )}
            </div>
            {!item.hideButton && (
              <div className="flex justify-end">
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
          <>
            <iframe
              title="Request Beta Access"
              src="https://mautic.tools.treasurechess.com/form/2"
              width="100%"
              height="500"
            >
              <p>Your browser does not support iframes.</p>
            </iframe>
          </>
        }
      />
    </div>
  )
}

export default Settings
