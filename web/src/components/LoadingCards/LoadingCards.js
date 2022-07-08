import React from 'react'
import { useSprings, animated, to as interpolate } from 'react-spring'

const LoadingCards = () => {
  const { innerWidth: width, innerHeight: height } = window
  const [props] = useSprings(80, (i) => {
    return {
      x: getRandomArbitrary(-150, width - 100),
      y: getRandomArbitrary(-height + 300, height / 2 - 130),
      scale: 1,
      rot: -10 + Math.random() * 20,
      delay: i * Math.random() * 600,
      from: { x: width / 2 - 150, rot: 0, scale: 1.2, y: height },
    }
  }) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="container-loading-cards">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className="deck" key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(/card-back-small.png)`,
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
