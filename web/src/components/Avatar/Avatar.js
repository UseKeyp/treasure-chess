import EmptyAvatar from './EmptyAvatar'

const Avatar = ({ src, bgColor, size }) => {
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, backgroundColor: bgColor }}
    >
      {src ? (
        <img className="avatar-img" src={src} alt="chess.com member avatar" />
      ) : (
        <EmptyAvatar alt="chess.com member avatar" />
      )}
    </div>
  )
}

Avatar.defaultProps = {
  bgColor: '#c4c4c4',
  size: 68,
}

export default Avatar
