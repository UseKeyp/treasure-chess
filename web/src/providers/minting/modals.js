import { routes, navigate } from '@redwoodjs/router'
import ReactCanvasConfetti from 'react-canvas-confetti'

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
  if (!mintPurchase) return null
  const { tokenId } = mintPurchase.treasure
  const handleSubmit = () => {
    navigate(routes.treasure({ tokenId }))
    onSubmit()
    toggleModal()
  }
  const hideModal = () => {
    onSubmit()
    toggleModal()
  }
  return (
    <ModalContainer
      headerText="New Treasure Minted!"
      isVisible={isVisible}
      onSubmit={handleSubmit}
      hideModal={hideModal}
      submitText="View"
      cancelText="Back"
      content={
        <div className="flex justify-center align-center h-full w-full">
          <TreasureCardCell tokenId={tokenId.toString()} />
          <ConfettiExplosion />
        </div>
      }
    />
  )
}

const ConfettiExplosion = () => {
  const refAnimationInstance = React.useRef(null)

  const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  }

  const getInstance = React.useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = React.useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fire = React.useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])

  React.useEffect(() => {
    fire()
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [])

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
}
