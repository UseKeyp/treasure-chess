import { createPortal } from 'react-dom'
import Button from 'src/components/Button/Button'
import LoadingDots from 'src/components/LoadingDots'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { useEffect } from 'react'

const ModalContainer = ({
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
  if (isBrowser) {
    if (isVisible) {
      document.body.style.width = '100%'
    } else {
      document.body.style.position = 'relative'
    }
  }
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isVisible])

  return isVisible
    ? createPortal(
        <div>
          <div className="overlay" aria-hidden="true" onClick={hideModal} />
          <div className="modal-wrapper">
            <div className="modal-header-wrapper">
              <h2 className="header-text">{headerText}</h2>
              {icon}
            </div>
            {typeof content === 'string' ? (
              <p className="body-text">{content}</p>
            ) : (
              <div className="body-text">{content}</div>
            )}
            <div className="modal-button-wrapper">
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
        </div>,
        document.body
      )
    : null
}

export default ModalContainer
