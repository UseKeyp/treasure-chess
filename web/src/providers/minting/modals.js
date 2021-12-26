import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import Icon from 'src/components/Icon'

export const CancelModal = ({ isVisible, toggleModal, onSubmit }) => (
  <ModalContainer
    headerText="Cancel Order"
    isVisible={isVisible}
    onSubmit={onSubmit}
    hideModal={toggleModal}
    submitText="Confirm"
    cancelText="Back"
    content={<p className="text-base">Your current order will be canceled.</p>}
  />
)
