import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import FilterPriceInput from 'src/components/FilterPriceInput'
import { useRamp } from 'src/providers/ramp/ramp'
import LoadingDots from 'src/components/LoadingDots'
import Button from 'src/components/Button'
import { trimAddress } from 'src/utils/helpers'

const VendorConnection = ({ ramp, amount, isLoading, disabled }) => {
  if (!ramp) return null
  let backgroundColor = isLoading
    ? 'bg-chessBlack-200 pointer-events-none'
    : 'bg-green'
  const loadingText = (
    <p className="text-white flex justify-center text-[10px]">
      <LoadingDots />
    </p>
  )
  const buttonClassName = `mt-4 w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
  let rampError
  if (ramp.error != null && ramp.error != '' && ramp.error.length > 0) {
    rampError = ramp.error.substring(0, 200)
  } else {
    rampError = ''
  }

  let button = (
    <Button
      id="connection-button"
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
      <div className="flex align-center">
        <div>
          <h4>
            <i>Connected to {trimAddress(ramp.address)}</i>
          </h4>
          <h4>
            <i>{ramp.accountNickname}</i>
          </h4>
        </div>
        <div className="flex ml-4 align-center">
          <Button onClick={ramp.onConnect} disabled={isLoading}>
            <div className="flex flex-row items-center">
              <Icon name="circle_arrow" height="13" color="white" />
              <p className="ml-2">Update</p>
            </div>
          </Button>
        </div>
      </div>
    )
  const icon =
    ramp.type === 'COINBASE' ? (
      <Icon name="coinbase" size="45%" color="white" className="mb-2" />
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
      <div className="flex align-center items-center">{icon}</div>
      <h2 className="mt-2">{status}</h2>
      {button}
      <div className="mt-8 font-bold text-errorYellow">{rampError}</div>
    </div>
  )
}

export const DepositModal = ({ isVisible, toggleModal }) => {
  const { deposit } = useRamp()
  return (
    <ModalContainer
      isVisible={isVisible}
      onSubmit={deposit}
      hideModal={toggleModal}
      headerText="Add Funds"
      icon={<Icon name="wyre" size="29" />}
      submitText="Continue to Wyre"
      content={
        <>
          {' '}
          <p className="text-base">
            Use a debit card to instantly add funds to your account.
          </p>
          <p className="mt-4">
            Fees - Wyre: 2.9% + $0.30 (
            <a
              className="underline"
              rel="noreferrer"
              href="https://docs.sendwyre.com/reference/hosted-checkout#tr  ansaction-processing-limits"
              target="_blank"
            >
              see limits
            </a>
            )
          </p>
          <p className="mt-4">
            We are actively working to improve this experience, and to add
            support for more regions. If you have feedback please let us know
            using the{' '}
            <a
              className="underline"
              href="/feedback"
              rel="noreferrer"
              target="_blank"
            >
              Feedback Form
            </a>
            .
          </p>
          <p className="mt-4">
            <i>
              By submitting, I authorize Wyre Payments, Inc., to electronically
              charge my credit/debit card (and, if necessary, electronically
              credit my card) using the card indicated by me. I understand that
              this authorization will remain in full force and effect until I
              notify Treasure Chess that I wish to revoke this authorization. I
              agree that credit/debit card transactions I authorize, comply with
              all applicable law.{' '}
            </i>
          </p>
        </>
      }
    />
  )
}
export const WithdrawModal = ({ isVisible, toggleModal }) => {
  const [amount, setAmount] = React.useState('0')
  const { ramps, isLoading } = useRamp()
  const isConnected = ramps.map((ramp) => ramp.address && true).includes(true)
  return (
    <ModalContainer
      headerText="Cash Out"
      isVisible={isVisible}
      onSubmit={toggleModal}
      hideModal={toggleModal}
      // icon={<Icon name="wyre" size="29" />}
      content={
        <>
          <p className="text-base">Send funds to your bank at any time.</p>
          <p className="mt-4">
            Supported Countries - Wyre: US
            {/*, Coinbase:{' '}
            <a
              className="underline"
              rel="noreferrer"
              target="_blank"
              href="https://www.coinbase.com/places"
            >
              see full list
            </a>*/}
          </p>
          <p className="">Fees - Wyre: 0.2%</p>
          {isConnected && (
            <>
              <h4 className="mt-4 ">Amount to cash out</h4>
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
          <p className="mt-4">
            For your protection, funds can only be sent one-way from your
            Treasure Chess account to your bank. Funds can never be withdrawn
            from your bank using this method. We are actively working to improve
            this experience, and enable support for more countries.
          </p>
        </>
      }
    />
  )
}
