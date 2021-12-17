import { createPortal } from 'react-dom'
import Button from 'src/components/Button/Button'

const ModalContainer = ({
  isVisible,
  hideModal,
  content,
  headerText,
  submitText,
  onSubmit,
  icon,
}) => {
  isVisible
    ? (document.body.style.position = 'fixed')
    : (document.body.style.position = 'relative')

  return isVisible
    ? createPortal(
        <div>
          <div className="overlay" aria-hidden="true" onClick={hideModal} />
          <div className="modal-wrapper">
            <div className="modal-header-wrapper">
              <h2 className="header-text">{headerText}</h2>
              {icon}
            </div>
            <p className="body-text">{content}</p>
            <div className="modal-button-wrapper">
              <Button variant="transparent" onClick={hideModal}>
                Cancel
              </Button>
              <Button variant="blue" onClick={onSubmit}>
                {submitText}
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}

export default ModalContainer
