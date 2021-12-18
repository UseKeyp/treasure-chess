import Avatar from './Avatar'
import avatar from './chess-avatar.png'

const Wrapper = ({ children }) => (
  <div style={{ backgroundColor: '#fff', width: 'max-content' }}>
    {children}
  </div>
)

export const generated = () => {
  return (
    <Wrapper>
      <Avatar src={avatar} />
    </Wrapper>
  )
}

export const size128andGreenBg = () => {
  return (
    <Wrapper>
      <Avatar image={avatar} size={128} bgColor="green" />
    </Wrapper>
  )
}

export default { title: 'Components/Avatar' }
