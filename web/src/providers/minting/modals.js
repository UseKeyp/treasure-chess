import { routes, navigate } from '@redwoodjs/router'

import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import LoadingDots from 'src/components/LoadingDots'
import Confetti from 'src/components/Confetti'
import { isBrowser } from 'src/utils/helpers'
import { useEffect } from 'react'

const VendorCheckoutProvider = ({ provider, onSubmit }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  if (!provider) return null
  let backgroundColor = isLoading
    ? 'bg-chessBlack-200 pointer-events-none'
    : 'bg-green'
  const loadingText = (
    <p className="text-white flex justify-center text-[10px]">
      <LoadingDots />
    </p>
  )
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

  let button = (
    <Button
      id="connection-button"
      className={buttonClassName}
      onClick={onSubmit}
      disabled={isLoading}
    >
      {provider.isLoading ? loadingText : 'Connect  '}
    </Button>
  )
  if (provider.address)
    button = (
      <Button
        className={buttonClassName}
        disabled={isLoading}
        onClick={() => provider.onWithdraw(amount)}
      >
        {provider.isLoading ? loadingText : 'Withdraw'}
      </Button>
    )
  if (provider.disabled) button = <h3 className="mt-4">(Coming soon)</h3>

  const icon = (
    <Icon name={provider.iconName} size="45%" color="white" className="mb-2" />
  )

  return (
    <div
      className={`align-center bg-chessBlack-100 mt-6 p-4 rounded-lg border-2 ${
        provider.address ? 'border-green' : 'border-chessBlack-100'
      }`}
    >
      <div className="flex align-center items-center">{icon}</div>
      <h2 className="mt-2">Some text</h2>
      {button}
      {errorText && (
        <div className="pt-8 font-bold text-errorYellow">{errorText}</div>
      )}
    </div>
  )
}

export const MintModal = ({ isVisible, toggleModal, onSubmit }) => {
  const providers = [
    {
      name: 'Stripe',
      iconName: 'stripe',
      disabled: true,
    },
  ]
  return (
    <ModalContainer
      headerText="Mint"
      isVisible={true}
      // isVisible={isVisible}
      hideModal={toggleModal}
      cancelText="Back"
      content={
        <>
          <p className="text-base">
            Pay with debit card using a provider below
          </p>
          {providers.map((provider) => (
            <VendorCheckoutProvider
              key={provider.name}
              provider={provider}
              onSubmit={onSubmit}
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
