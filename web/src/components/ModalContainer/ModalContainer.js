import PropTypes from 'prop-types'

import { ReactComponent as WyreLogo } from '../../assets/icons/wyre.svg'

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
  // iconSrc,
}) => {
  return (
    <div className="modal-outer-container">
      <div className="modal-header-container flex pb-2" style={headerStyle}>
        <h2 className="header-text">{headerText}</h2>
        <WyreLogo />
      </div>
      <p className="body-text" style={{ fontSize: '16px', paddingTop: '10px' }}>
        {bodyText}
      </p>
      <div className="modal-button-container pt-3" style={headerStyle}>
        <button className="modal-close-button" onClick={onClose}>
          Cancel
        </button>
        <button className="modal-submit-button" onClick={onSubmit}>
          {submitText}
        </button>
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
