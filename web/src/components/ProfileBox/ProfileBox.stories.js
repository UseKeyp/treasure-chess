import ProfileBox from './ProfileBox'
import avatar from 'src/components/Avatar/chess-avatar.png'

import members from '../../../../scripts/seed/member'

export const generated = () => {
  return <ProfileBox member={members[0]} />
}

export default { title: 'Components/ProfileBox' }
