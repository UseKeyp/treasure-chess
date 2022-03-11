import iconMap from 'src/assets/icons/icon-map'

const EmptyIcon = () => <div />

const Icon = ({ name, size, color, ...rest }) => {
  const Icon = iconMap[name] || EmptyIcon
  return <Icon color={color} style={{ width: size, height: size }} {...rest} />
}

Icon.defaultProps = {
  size: '32px',
  color: 'black',
}

export default Icon

export const TwitchIcon = ({ color = '#5A3E85', size = 20, ...rest }) => (
  <Icon name="twitch" size={size} color={color} {...rest} />
)
