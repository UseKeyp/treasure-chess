import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import FilterPriceInput from 'src/components/FilterPriceInput'
import { useRamp } from 'src/providers/ramp/ramp'
import LoadingDots from 'src/components/LoadingDots'
import Button from 'src/components/Button'
import { trimAddress, getBlockExplorerUrl } from 'src/utils/helpers'
import { onRamps, feedbackSuggestionCta } from 'src/providers/ramp/onRamps'
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
  const buttonClassName = `mt-2 w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
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
      {isLoading ? <LoadingDots /> : buttonText}
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
      {description && <div className="mt-2">{description}</div>}
      <h2 className="mt-2">{status}</h2>
      {!hideButton && button}
      {errorText && (
        <div className="mt-4 font-bold text-errorYellow">{errorText}</div>
      )}
      {helperText && <div className="mt-2">{helperText}</div>}
    </div>
  )
}

const OnRampProvider = ({ ramp, toggleModal, isLoading, onSubmit }) => {
  if (!ramp) return null
  const onClick = async () => {
    await onSubmit(ramp.type)
    toggleModal()
  }
  return (
    <Provider
      onSubmit={onClick}
      highlight={true}
      isLoading={isLoading === ramp.type}
      {...ramp}
    />
  )
}

const OffRampProvider = ({ ramp, amount }) => {
  if (!ramp) return null
  let onSubmit = ramp.onConnect
  if (ramp.address) onSubmit = () => ramp.onWithdraw(amount)
  let status
  if (ramp.address)
    status = (
      <div className="flex align-center">
        <div>
          <h4>
            <i>
              Connected to{' '}
              <a
                href={getBlockExplorerUrl({ address: ramp.address })}
                rel="noreferrer"
                target="_blank"
              >
                {trimAddress(ramp.address)}
              </a>
            </i>
          </h4>
          <h4>
            <i>{ramp.accountNickname}</i>
          </h4>
        </div>
        <div className="flex ml-4 align-center">
          <Button onClick={onSubmit} disabled={ramp.isLoading || ramp.disabled}>
            <div className="flex flex-row items-center">
              <Icon name="circle_arrow" height="13" color="white" />
              <p className="ml-2">Update</p>
            </div>
          </Button>
        </div>
      </div>
    )
  const getButtonText = () => {
    if (ramp.disabled) return 'Coming soon'
    else if (ramp.address) return 'Withdraw'
    return 'Connect'
  }
  return (
    <Provider
      onSubmit={onSubmit}
      isLoading={ramp.isLoading}
      disabled={ramp.disabled}
      buttonText={getButtonText()}
      highlight={!!ramp.address}
      status={status}
      {...ramp}
    />
  )
}

export const DepositModal = ({ isVisible, toggleModal }) => {
  const { getRampUrl, isLoading } = useRamp()
  const onSubmit = (type) => getRampUrl({ direction: 'ON', type })
  return (
    <ModalContainer
      isVisible={isVisible}
      hideModal={toggleModal}
      headerText="Add Funds"
      content={
        <>
          <p className="text-base">Instantly add funds using a debit card.</p>
          {[...onRamps, feedbackSuggestionCta].map((ramp) => (
            <OnRampProvider
              key={ramp.name}
              ramp={ramp}
              toggleModal={toggleModal}
              isLoading={isLoading}
              onSubmit={onSubmit}
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
            <div className="bg-chessBlack-100 p-2 mt-4 rounded-lg ">
              <h4 className="mb-2">Amount</h4>
              <FilterPriceInput value={amount} setValue={setAmount} />
            </div>
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
