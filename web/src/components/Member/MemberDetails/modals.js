import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import Icon from 'src/components/Icon'

export const AddressModal = ({ address, isVisible, toggleModal }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    if (typeof document === 'undefined') {
      return
    }

    const textArea = document.createElement('textarea')
    textArea.value = address
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    setCopied(true)

    setTimeout(() => setCopied(false), 4000)
  }, [address])

  return (
    <ModalContainer
      isVisible={isVisible}
      headerText="Deposit USDC"
      submitText={copied ? 'Copied!' : 'Copy Wallet Address'}
      onSubmit={() => handleCopy()}
      hideModal={toggleModal}
      content={
        <>
          <p className="text-base">
            <span>WARNING: At this time you can </span>
            <span className={'modals__matic-warning'}>
              only deposit USDC on the Polygon Network (Matic).
            </span>
          </p>

          <p className="mt-4 text-base">
            Do not send anything else to this address, or use other networks.
            You will not be able to recover other assets, and they may be lost
            forever. We cannot guarantee support will be added for other
            networks or assets.
          </p>

          <p className="mt-4 text-base">
            By continuing you agree you’ve read this and understand these risks.
          </p>
        </>
      }
    />
  )
}
export const DepositModal = ({ isVisible, toggleModal, onSubmit }) => (
  <ModalContainer
    isVisible={isVisible}
    onSubmit={onSubmit}
    hideModal={toggleModal}
    headerText="Deposit Funds"
    icon={<Icon name="wyre" size="29" />}
    submitText="Deposit with Wyre"
    content={
      <p className="text-base">
        Fund your wallet using Wyre. Funds are typically added in less than 3
        minutes, and can be withdrawn anytime according to the limits set by
        Wyre.
      </p>
    }
  />
)

export const WithdrawModal = ({ isVisible, toggleModal, onSubmit }) => (
  <ModalContainer
    headerText="Withdraw Funds"
    isVisible={isVisible}
    onSubmit={onSubmit}
    hideModal={toggleModal}
    icon={<Icon name="wyre" size="29" />}
    submitText="Withdraw with Wyre"
    content={
      <p className="text-base">
        Withdraw your funds using Wyre. Funds can be withdrawn anytime according
        to the limits set by Wyre.
      </p>
    }
  />
)
