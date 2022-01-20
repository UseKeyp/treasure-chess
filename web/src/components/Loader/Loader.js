import { useSpring, animated } from 'react-spring'

const Loader = () => {
  const [flip, set] = React.useState(false)
  const props = useSpring({
    to: { height: '80%' },
    from: { height: '100%' },
    reset: true,
    reverse: flip,
    onRest: () => set(!flip),
  })
  return (
    <div className="loader-wrapper">
      <animated.img style={props} src="/loading-icon.png" />
    </div>
  )
}

export default Loader
