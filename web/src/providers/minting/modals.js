import { routes, navigate } from '@redwoodjs/router'

import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import LoadingDots from 'src/components/LoadingDots'
import Confetti from 'src/components/Confetti'
import { isBrowser } from 'src/utils/helpers'
import { useEffect } from 'react'
import { useWallet } from 'src/providers/wallet'

const CheckoutProvider = ({ provider, onSubmit }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  if (!provider) return null
  let backgroundColor =
    isLoading || provider.disabled
      ? 'bg-chessBlack-200 pointer-events-none'
      : 'bg-green'
  const buttonClassName = `mt-4 w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
  let errorText
  if (
    provider.error != null &&
    provider.error != '' &&
    provider.error.length > 0
  ) {
    errorText = provider.error.substring(0, 200)
  } else {
    errorText = ''
  }
  const onClick = () => {
    setIsLoading(true)
    onSubmit(provider.type)
  }
  let button = (
    <Button
      id="connection-button"
      className={buttonClassName}
      onClick={onClick}
      disabled={isLoading}
    >
      {provider.isLoading ? (
        <p className="text-white flex justify-center text-[10px]">
          <LoadingDots />
        </p>
      ) : (
        'Continue  '
      )}
    </Button>
  )
  if (provider.disabled)
    button = (
      <Button
        id="connection-button"
        className={buttonClassName}
        disabled={true}
      >
        Coming soon
      </Button>
    )

  const icon = provider.iconName ? (
    <Icon name={provider.iconName} size="45%" color="white" className="mb-2" />
  ) : (
    <h2>{provider.name}</h2>
  )

  return (
    <div
      className={`align-center bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
        !provider.disabled ? 'border-green' : 'border-chessBlack-100'
      }`}
    >
      <div className="flex align-center items-center">{icon}</div>
      {provider.description && (
        <div className="pt-4">{provider.description}</div>
      )}
      {button}
      {errorText && (
        <div className="pt-8 font-bold text-errorYellow">{errorText}</div>
      )}
      {provider.helperText && <p className="mt-3">{provider.helperText}</p>}
    </div>
  )
}

export const MintModal = ({ isVisible, toggleModal, onSubmit }) => {
  const { mintCreditBalance } = useWallet()
  const providers = [
    {
      name: 'Mint Credits',
      type: 'CREDIT',
      description: (
        <>
          Balance: <b>${mintCreditBalance}</b>
        </>
      ),
      helperText: '',
      // iconName: 'treasure_chess_full',
      disabled: mintCreditBalance < 1,
    },
    {
      name: 'Wyre',
      type: 'WYRE',
      description: 'Pay with card',
      helperText:
        'Tip: Do not use auto-complete, a password manager, or copy/paste. Try using a different email if your first attempt fails.',
      iconName: 'wyre',
    },
    {
      name: 'Stripe',
      type: 'STRIPE',
      description: 'Pay with card',
      helperText: '',
      disabled: true,
      iconName: 'stripe',
    },
  ]
  const onClick = (type) => {
    toggleModal()
    onSubmit(type)
  }
  return (
    <ModalContainer
      headerText="Mint"
      // isVisible={true}
      isVisible={isVisible}
      hideModal={toggleModal}
      cancelText="Back"
      content={
        <>
          <p className="text-base">
            Choose a payment method. The $5 minting fee helps keep the world
            free from spam Treasures.
          </p>
          {providers.map((provider) => (
            <CheckoutProvider
              key={provider.name}
              provider={provider}
              onSubmit={onClick}
            />
          ))}
        </>
      }
    />
  )
}

export const CancelModal = ({ isVisible, toggleModal, onSubmit }) => {
  return (
    <ModalContainer
      headerText="Cancel Order"
      isVisible={isVisible}
      onSubmit={onSubmit}
      hideModal={toggleModal}
      submitText="Confirm"
      cancelText="Back"
      content={
        <p className="text-base">Your current order will be canceled.</p>
      }
    />
  )
}

export const SuccessModal = ({
  isVisible,
  toggleModal,
  onSubmit,
  mintPurchase,
}) => {
  useEffect(() => {
    if (isBrowser) {
      if (isVisible) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'visible'
      }
    }
  }, [isVisible])

  if (!mintPurchase) return null
  const { tokenId } = mintPurchase.treasure
  const handleSubmit = () => {
    navigate(routes.treasure({ tokenId }))
    if (isBrowser) {
      window.location.reload()
    }
    onSubmit()
    toggleModal()
  }
  const hideModal = () => {
    onSubmit()
    toggleModal()
  }
  return (
    <>
      <ModalContainer
        headerText="New Treasure Minted!"
        isVisible={isVisible}
        onSubmit={handleSubmit}
        hideModal={hideModal}
        submitText="View"
        cancelText="Back"
        content={
          <div className="flex justify-center align-center h-full w-full">
            <TreasureCardCell disableAnimation tokenId={tokenId.toString()} />
          </div>
        }
      />
      <Confetti />
    </>
  )
}
