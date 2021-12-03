import EmptyAvatar from './EmptyAvatar'

const Avatar = ({ image, bgColor, size }) => {
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, backgroundColor: bgColor }}
    >
      {image ? (
        <img className="avatar-img" src={image} alt="chess.com user avatar" />
      ) : (
        <EmptyAvatar />
      )}
    </div>
  )
}

Avatar.defaultProps = {
  bgColor: '#c4c4c4',
  size: 68,
}

export default Avatar
