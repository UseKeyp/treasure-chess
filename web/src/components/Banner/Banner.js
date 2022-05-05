import Button from 'src/components/Button/Button'
import LoadingDots from 'src/components/LoadingDots'

const Banner = ({
  isVisible,
  hideModal,
  content,
  headerText,
  submitText,
  cancelText,
  onSubmit,
  icon,
  hideCancelButton,
  isLoading,
}) => {
  return isVisible ? (
    <div>
      <div className="" aria-hidden="true" onClick={hideModal} />
      <div className="banner-wrapper">
        <div className="banner-header-wrapper">
          <h2 className="header-text">{headerText}</h2>
          {icon}
        </div>
        <div className="flex">
          {typeof content === 'string' ? (
            <p className="body-text">{content}</p>
          ) : (
            <div className="body-text">{content}</div>
          )}
          <div className="banner-button-wrapper">
            {!hideCancelButton ? (
              <Button variant="transparent" onClick={hideModal}>
                {cancelText || 'Cancel'}
              </Button>
            ) : (
              <div></div>
            )}
            {submitText && (
              <Button variant="blue" onClick={onSubmit}>
                {isLoading ? <LoadingDots /> : submitText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Banner
