import { useSpring, animated } from 'react-spring'

const Loader = () => {
  const [flip, set] = React.useState(false)
  const props = useSpring({
    to: { height: '8rem' },
    from: { height: '10rem' },
    reset: true,
    reverse: flip,
    onRest: () => set(!flip),
  })
  return <animated.img style={props} src="/logo.png" />
}

export default Loader
