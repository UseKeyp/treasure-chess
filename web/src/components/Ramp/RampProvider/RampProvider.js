import Icon from 'src/components/Icon'
import LoadingDots from 'src/components/LoadingDots'
import Button from 'src/components/Button'

const RampProvider = ({
  error,
  isLoading,
  onSubmit,
  buttonText = 'Continue',
  disabled,
  status,
  highlight,
  highlightStatus,
  description,
  helperText,
  hideButton,
  iconName,
  icon,
  name,
  successText,
}) => {
  let backgroundColor =
    isLoading || disabled ? 'bg-chessBlack-200 pointer-events-none' : 'bg-green'
  const buttonClassName = `mt-4 w-32 h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
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
      size="small"
      variant="green"
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
      className={`align-center h-full bg-chessBlack-200 p-4 rounded-lg border-[1px] ${
        highlight ? 'border-green' : 'border-chessBlack-200'
      }`}
    >
      <div className="flex align-center items-center">{iconContent}</div>
      {description && <div className="mt-2">{description}</div>}
      {status && (
        <h2
          className={`mt-4 bg-chessBlack-100 p-2 rounded-lg ${
            highlightStatus ? 'border-green' : ''
          }`}
        >
          {status}
        </h2>
      )}
      {!hideButton && button}
      {errorText && (
        <p className="mt-4 font-bold text-errorYellow">{errorText}</p>
      )}
      {successText && (
        <p className="mt-4 font-bold text-green">{successText}</p>
      )}
      {helperText && <div className="mt-2">{helperText}</div>}
    </div>
  )
}
export default RampProvider
