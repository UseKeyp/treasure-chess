import { X } from 'react-feather'
import PropTypes from 'prop-types'

const ModalContainer = ({
  title,
  onClose,
  children,
  stepNum = undefined,
  totalNumSteps = undefined,
  statusText = undefined,
}) => {
  const showProgressIndicator =
    Number.isInteger(stepNum) && Number.isInteger(totalNumSteps)

  return (
    <div className="modal-outer-container bg-white flex-col flex items-center border-black border-solid border fixed sm:w-64 md:w-96">
      <button className="absolute modal-close-button" onClick={onClose}>
        <X size={32} color="#fff" />
      </button>
      <h2 className="flex justify-center font-black text-2xl mx-auto mb-0 mt-0">
        {title}
      </h2>
      {showProgressIndicator && (
        <div
          className="rounded-lg mt-8 h-4"
          style={{
            width: '60%',
            backgroundColor: '#EEEDED',
          }}
        >
          <div
            className="h-full rounded-lg"
            style={{
              width: `${((stepNum / totalNumSteps) * 100).toFixed(0)}%`,
              backgroundColor: '#B9CC36',
            }}
          />
        </div>
      )}
      {statusText && <div className="text-sm mt-4 font-bold">{statusText}</div>}
      <div className="text-lg p-6 text-center">{children}</div>
    </div>
  )
}

ModalContainer.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.element,
  stepNum: PropTypes.number,
  totalNumSteps: PropTypes.number,
  statusText: PropTypes.string,
}

export default ModalContainer
