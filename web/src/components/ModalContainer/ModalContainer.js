import { createPortal } from 'react-dom'
import Button from 'src/components/Button/Button'

const ModalContainer = ({
  isVisible,
  hideModal,
  hideCancelButton,
  content,
  headerText,
  submitText,
  cancelText,
  onSubmit,
  icon,
  requireScroll,
}) => {
  const [bottom, setBottom] = React.useState(!requireScroll)

  // eslint-disable-next-line no-unused-expressions
  isVisible
    ? ((document.body.style.position = 'fixed'),
      (document.body.style.width = '100%'))
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
            <p
              id="text"
              onScroll={() => {
                const text = document.getElementById('text')
                requireScroll &&
                  setBottom(
                    text?.scrollTop === text?.scrollHeight - text?.offsetHeight
                  )
              }}
              className="body-text"
            >
              {content}
            </p>
            <div className="modal-button-wrapper">
              {!hideCancelButton ? (
                <Button variant="transparent" onClick={hideModal}>
                  {cancelText || 'Cancel'}
                </Button>
              ) : (
                <div></div>
              )}
              <Button variant="blue" onClick={onSubmit} isDisabled={!bottom}>
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
