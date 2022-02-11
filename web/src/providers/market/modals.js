import ModalContainer from 'src/components/ModalContainer/ModalContainer'

import { PENDING_SOLD, PENDING_DELISTED } from './constants'

export const ConfirmModal = ({ data, isVisible, toggleModal, onSubmit }) => {
  let text = `List Treasure for $${data.amount}`
  if (data.type === PENDING_DELISTED) text = `Unist Treasure`
  if (data.type === PENDING_SOLD) text = `Purchase Treasure for $${data.amount}`

  const handleSubmit = () => {
    toggleModal()
    onSubmit()
  }

  return (
    <ModalContainer
      headerText={text}
      // headerText={`List`}
      isVisible={isVisible}
      onSubmit={handleSubmit}
      hideModal={toggleModal}
      submitText="Confirm"
      cancelText="Cancel"
      // content={<p className="text-base">Your current order will be canceled.</p>}
    />
  )
}
