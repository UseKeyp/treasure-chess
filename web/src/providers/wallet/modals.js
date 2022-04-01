import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import FilterPriceInput from 'src/components/FilterPriceInput'
import Button from 'src/components/Button'
import LoadingDots from 'src/components/LoadingDots'
import { useRamp } from 'src/providers/ramp'
import { trimAddress } from 'src/utils/helpers'

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
            <span className={'modals__matic-warning'}>
              WARNING: Only deposit USDC on the Polygon (Matic) network.
            </span>
          </p>

          <p className="mt-4 text-base">
            Do not send anything else to this address. Do not use other
            networks. You will not be able to recover assets, and they may be
            lost forever. We cannot guarantee support will be added for other
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

export const DepositModal = ({ isVisible, toggleModal }) => {
  const { deposit } = useRamp()
  return (
    <ModalContainer
      isVisible={isVisible}
      onSubmit={deposit}
      hideModal={toggleModal}
      headerText="Deposit Funds"
      icon={<Icon name="wyre" size="29" />}
      submitText="Deposit with Wyre"
      content={
        <>
          {' '}
          <p className="text-base">
            Fund your wallet using Wyre. Funds are typically added in less than
            3 minutes, and can be withdrawn anytime according to the limits set
            by Wyre.
          </p>
          <p className="text-base mt-4 mb-4">
            <i>
              By submitting, I authorize Wyre Payments, Inc., to electronically
              charge my credit/debit card (and, if necessary, electronically
              credit my card) using the card indicated by me. I understand that
              this authorization will remain in full force and effect until I
              notify Treasure Chess that I wish to revoke this authorization. I
              agree that credit/debit card transactions I authorize, comply with
              all applicable law.
            </i>
          </p>
        </>
      }
    />
  )
}

const VendorConnection = ({ ramp, amount, isLoading, disabled }) => {
  if (!ramp) return null
  const backgroundColor = isLoading
    ? 'bg-chessBlack-200 pointer-events-none'
    : 'bg-green'
  const loadingText = (
    <p className="text-white flex justify-center text-[10px]">
      <LoadingDots />
    </p>
  )
  const buttonClassName = `mt-4 w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
  let button = (
    <Button
      className={buttonClassName}
      onClick={ramp.onConnect}
      disabled={isLoading}
    >
      {ramp.isLoading ? loadingText : 'Connect  '}
    </Button>
  )
  if (ramp.address)
    button = (
      <Button
        className={buttonClassName}
        disabled={isLoading}
        onClick={() => ramp.onWithdraw(amount)}
      >
        {ramp.isLoading ? loadingText : 'Withdraw'}
      </Button>
    )
  if (disabled) button = <h3 className="mt-4">(Coming soon)</h3>

  let status
  if (ramp.address)
    status = (
      <>
        <h4>
          <i>Connected to {trimAddress(ramp.address)}</i>
        </h4>
        <h4>
          <i>{ramp.accountNickname}</i>
        </h4>
      </>
    )
  const icon =
    ramp.type === 'COINBASE' ? (
      <Icon
        name="coinbase"
        size="25"
        height="25"
        color="white"
        className=" mb-2"
      />
    ) : (
      <img
        src="/icons/wyre_plaid.png"
        alt="Wyre and Plaid logos"
        className="h-12"
      />
    )
  return (
    <div
      className={`align-center bg-chessBlack-100 mt-6 p-4 rounded-lg border-2 ${
        ramp.address ? 'border-green' : 'border-chessBlack-100'
      }`}
    >
      <div className=" flex align-center items-center">{icon}</div>
      <h2 className="mt-2">{status}</h2>
      {button}
      <p className="mt-2 text-orange">{ramp.error}</p>
    </div>
  )
}

export const WithdrawModal = ({ isVisible, toggleModal }) => {
  const [amount, setAmount] = React.useState('0')
  const { ramps, isLoading } = useRamp()
  const isConnected = ramps.map((ramp) => ramp.address && true).includes(true)
  return (
    <ModalContainer
      headerText="Withdraw Funds"
      isVisible={isVisible}
      onSubmit={toggleModal}
      hideModal={toggleModal}
      // icon={<Icon name="wyre" size="29" />}
      content={
        <>
          <p className="text-base">
            Withdraw your funds anytime. Limits are set by each third-party
            provider. Connections are <i>Read-Only</i>.
          </p>

          {isConnected && (
            <>
              <h4 className="mt-4 ">Amount to withdraw</h4>
              <FilterPriceInput value={amount} setValue={setAmount} />
            </>
          )}
          {ramps.map((ramp) => (
            <VendorConnection
              key={ramp.name}
              isLoading={isLoading}
              amount={amount}
              ramp={ramp}
              toggleModal={toggleModal}
            />
          ))}
        </>
      }
    />
  )
}
