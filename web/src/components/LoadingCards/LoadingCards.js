import React, { useState, useEffect } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import ChessCard from 'src/assets/artifacts/chessCard.png'

const len = 50

const LoadingCards = () => {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(len, (i) => {
    return {
      ...to(i),
      from: from(i),
    }
  }) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  useEffect(() => {
    api.start((index) => ({ ...to(index) }))
  }, [to])

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
      if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1 // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === len)
        setTimeout(() => {
          gone.clear()
          api.start((i) => to(i))
        }, 600)
    }
  )
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className="deck" key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${ChessCard})`,
            }}
          />
        </animated.div>
      ))}
    </>
  )
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

// These two are just helpers, they curate spring data, values that are later being interpolated into css
export const to = ({ rot, i }) => ({
  x: getRandomArbitrary(-200, 200) * 3,
  y: getRandomArbitrary(-200, 200) * 2,
  scale: 0.8,
  rot: -10 + Math.random() * rot,
  delay: i * 200,
})
export const from = (_i) => ({ x: 500, rot: 20, scale: 6, y: -5000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
export const trans = (r, s) =>
  `perspective(5000px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`

export default LoadingCards
