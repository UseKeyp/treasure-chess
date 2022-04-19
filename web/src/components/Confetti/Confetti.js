import ReactCanvasConfetti from 'react-canvas-confetti'

const Confetti = ({ type }) => {
  const refAnimationInstance = React.useRef(null)

  const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 9999,
  }

  const getInstance = React.useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  let makeShot = React.useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fire = React.useCallback(() => {
    makeShot(1, { spread: 120, startVelocity: 70 })
    makeShot(0.2, { spread: 60, startVelocity: 40 })
    makeShot(0.35, { spread: 100, decay: 0.8, scalar: 0.8, startVelocity: 40 })
    makeShot(0.1, { spread: 90, startVelocity: 40, decay: 0.92, scalar: 1.2 })
    makeShot(0.1, { spread: 20, startVelocity: 100 })
  }, [makeShot])

  const makeShotRight = React.useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.4, x: -0.2 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])
  const makeShotLeft = React.useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.4, x: 1.2 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fireRain = React.useCallback(() => {
    // Left to right
    makeShotRight(0.7, { angle: 60, spread: 60, startVelocity: 20 })
    makeShotRight(0.8, { angle: 40, spread: 40, startVelocity: 40 })
    makeShotRight(0.9, { angle: 30, spread: 30, startVelocity: 60 })
    makeShotRight(1, { angle: 20, spread: 20, startVelocity: 90 })
    // Right to left
    makeShotLeft(0.7, { angle: 130, spread: 60, startVelocity: 20 })
    makeShotLeft(0.8, { angle: 140, spread: 40, startVelocity: 40 })
    makeShotLeft(0.9, { angle: 150, spread: 30, startVelocity: 60 })
    makeShotLeft(1, { angle: 160, spread: 20, startVelocity: 90 })
  }, [makeShotRight, makeShotLeft])

  React.useEffect(() => {
    if (type === 'rain') {
      fireRain()
    } else fire()
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [])

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
}

export default Confetti
