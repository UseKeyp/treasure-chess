import PropTypes from 'prop-types'

const headerStyle = {
  display: 'flex',
  fontSize: '20px',
  justifyContent: 'space-between',
  width: '100%',
}

const ModalContainer = ({
  headerText,
  bodyText,
  submitText,
  onSubmit,
  onClose,
  iconSrc,
}) => {
  return (
    <div id="overlay">
      <div className="modal-outer-container">
        <div className="modal-header-container pb-2 center" style={headerStyle}>
          <h2 className="header-text">{headerText}</h2>
          <img src={iconSrc} alt="" style={{ height: '30px' }} />
        </div>
        <p
          className="body-text"
          style={{ fontSize: '16px', paddingTop: '10px' }}
        >
          {bodyText}
        </p>
        <div className="modal-button-container pt-3" style={headerStyle}>
          <button className="modal-close-button pr-10" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-submit-button" onClick={onSubmit}>
            {submitText}
          </button>
        </div>
      </div>
    </div>
  )
}

ModalContainer.propTypes = {
  headerText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  iconSrc: PropTypes.string,
}

export default ModalContainer
