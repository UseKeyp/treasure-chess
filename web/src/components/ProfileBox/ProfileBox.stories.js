import ProfileBox from './ProfileBox'
import avatar from 'src/components/Avatar/chess-avatar.png'

const address = '0x706342C7F358cF05370db27ae0d9b1791ADefd08'
const date = '21st May 2021'
const name = 'Username'
const score = 1337

export const generated = () => {
  return (
    <ProfileBox
      address={address}
      date={date}
      name={name}
      score={score}
      avatar={avatar}
    />
  )
}

export default { title: 'Components/ProfileBox' }
