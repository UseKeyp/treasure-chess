import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import FilterPriceInput from 'src/components/FilterPriceInput'
import { useRamp } from 'src/providers/ramp/ramp'
import LoadingDots from 'src/components/LoadingDots'
import Button from 'src/components/Button'
import { trimAddress } from 'src/utils/helpers'
import { getOnramps, feedbackSuggestionCta } from 'src/providers/ramp/onRamps'
import { useAuth } from '@redwoodjs/auth'
const Provider = ({
  error,
  isLoading,
  onSubmit,
  buttonText = 'Continue',
  disabled,
  status,
  highlight,
  description,
  helperText,
  hideButton,
  iconName,
  icon,
  name,
}) => {
  let backgroundColor =
    isLoading || disabled ? 'bg-chessBlack-200 pointer-events-none' : 'bg-green'
  const buttonClassName = `mt-4 w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
  let errorText
  if (error != null && error != '' && error.length > 0) {
    errorText = error.substring(0, 200)
  } else {
    errorText = ''
  }

  let button = (
    <Button
      id="connection-button"
      className={buttonClassName}
      onClick={onSubmit}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <p className="text-white flex justify-center text-[10px]">
          <LoadingDots />
        </p>
      ) : (
        buttonText
      )}
    </Button>
  )
  let iconContent = iconName ? (
    <Icon name={iconName} size="45%" color="white" className="mb-2" />
  ) : (
    <h2>{name}</h2>
  )
  if (icon) iconContent = icon
  return (
    <div
      className={`align-center bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
        highlight ? 'border-green' : 'border-chessBlack-100'
      }`}
    >
      <div className="flex align-center items-center">{iconContent}</div>
      {description && <div className="mt-4">{description}</div>}
      <h2 className="mt-2">{status}</h2>
      {!hideButton && button}
      {errorText && (
        <div className="mt-8 font-bold text-errorYellow">{errorText}</div>
      )}
      {helperText && <p className="mt-3 italic">{helperText}</p>}
    </div>
  )
}

const OnRampProvider = ({ ramp, toggleModal }) => {
  if (!ramp) return null
  const onSubmit = () => {
    ramp.onSubmit()
    toggleModal()
  }
  return <Provider onSubmit={onSubmit} highlight={true} {...ramp} />
}

const OffRampProvider = ({ ramp, amount, isLoading, disabled }) => {
  if (!ramp) return null
  let onSubmit = ramp.onConnect
  if (ramp.address) onSubmit = () => ramp.onWithdraw(amount)

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
          <Button onClick={onSubmit} disabled={isLoading || disabled}>
            <div className="flex flex-row items-center">
              <Icon name="circle_arrow" height="13" color="white" />
              <p className="ml-2">Update</p>
            </div>
          </Button>
        </div>
      </div>
    )
  return (
    <Provider
      onSubmit={onSubmit}
      isLoading={isLoading}
      disabled={disabled}
      buttonText={ramp.address ? 'Withdraw' : 'Connect'}
      highlight={!!ramp.address}
      satus={status}
      {...ramp}
    />
  )
}

export const DepositModal = ({ isVisible, toggleModal }) => {
  const { depositWyre } = useRamp()
  const { currentUser } = useAuth()
  const onRamps = getOnramps({
    address: currentUser?.address,
    depositWyre,
    toggleModal,
  })
  return (
    <ModalContainer
      isVisible={isVisible}
      // isVisible={true}
      hideModal={toggleModal}
      headerText="Add Funds"
      content={
        <>
          <p className="text-base">Instantly add funds using a debit card.</p>
          {onRamps.map((ramp) => (
            <OnRampProvider
              key={ramp.name}
              ramp={ramp}
              toggleModal={toggleModal}
            />
          ))}
        </>
      }
    />
  )
}

export const WithdrawModal = ({ isVisible, toggleModal }) => {
  const [amount, setAmount] = React.useState('0')
  const { offRamps, isLoading } = useRamp()
  const isConnected = offRamps
    .map((ramp) => ramp.address && true)
    .includes(true)

  return (
    <ModalContainer
      headerText="Cash Out"
      isVisible={isVisible}
      onSubmit={toggleModal}
      hideModal={toggleModal}
      content={
        <>
          <p className="text-base">Send funds to your bank at any time.</p>
          {isConnected && (
            <>
              <h4 className="mt-4 ">Amount to cash out</h4>
              <FilterPriceInput value={amount} setValue={setAmount} />
            </>
          )}
          {[...offRamps, feedbackSuggestionCta].map((ramp) => (
            <OffRampProvider
              key={ramp.name}
              isLoading={isLoading}
              amount={amount}
              ramp={ramp}
              toggleModal={toggleModal}
            />
          ))}
          <p className="mt-4 italic">
            For your protection, funds can only be sent one-way from your
            Treasure Chess account to your bank. Funds can never be withdrawn
            from your bank using this method.
          </p>
        </>
      }
    />
  )
}
