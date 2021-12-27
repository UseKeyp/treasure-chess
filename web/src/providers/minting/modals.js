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
export const SuccessModal = ({ isVisible, toggleModal, mintPurchase }) => {
  const { tokenId } = mintPurchase.treasure
  return (
    <ModalContainer
      headerText="Minting Success!"
      isVisible={isVisible}
      onSubmit={() => navigate(routes.treasure({ tokenId }))}
      hideModal={toggleModal}
      submitText="View"
      cancelText="Back"
      content={
        <>
          <TreasureCardCell tokenId={tokenId} />
        </>
      }
    />
  )
}
