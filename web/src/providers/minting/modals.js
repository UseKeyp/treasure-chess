import { routes, navigate } from '@redwoodjs/router'

import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'

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
export const SuccessModal = ({
  isVisible,
  toggleModal,
  onSubmit,
  mintPurchase,
}) => {
  const { tokenId } = mintPurchase.treasure
  const handleSubmit = () => {
    navigate(routes.treasure({ tokenId }))
    onSubmit()
  }
  return (
    <ModalContainer
      headerText="New Treasure Minted!"
      isVisible={isVisible}
      onSubmit={handleSubmit}
      hideModal={toggleModal}
      submitText="View"
      hideCancelButton
      content={
        <div className="flex justify-center align-center h-full w-full">
          <TreasureCardCell tokenId={tokenId} />
        </div>
      }
    />
  )
}
