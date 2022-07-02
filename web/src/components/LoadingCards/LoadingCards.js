import React from 'react'
import { useSprings, animated, to as interpolate } from 'react-spring'
import ChessCard from 'src/assets/artifacts/chessCard.png'

const LoadingCards = () => {
  const [props] = useSprings(100, (i) => {
    return {
      x: getRandomArbitrary(-200, 350) * 3,
      y: getRandomArbitrary(-200, 200) * 3,
      scale: 1.2,
      rot: -10 + Math.random(),
      delay: i * 200,
      from: { x: 500, rot: 20, scale: 6, y: -5000 },
    }
  }) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="container">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className="deck" key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${ChessCard})`,
            }}
          />
        </animated.div>
      ))}
    </div>
  )
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}
const trans = (r, s) =>
  `perspective(5000px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`

export default LoadingCards
