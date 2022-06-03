import { useSpring, animated } from 'react-spring'

const Loader = () => {
  const [flip, set] = React.useState(false)
  const props = useSpring({
    to: { height: '100%' },
    from: { height: '90%' },
    reset: true,
    config: { duration: 1000 },
    reverse: flip,
    onRest: () => set(!flip),
  })
  return (
    <div className="loader-wrapper">
      <animated.img style={props} src="/treasurechessfull-fatal-page.png" />
    </div>
  )
}

export default Loader
