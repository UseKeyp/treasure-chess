import ProfileBox from './ProfileBox'

import members from '../../../../scripts/seed/member'

export const generated = () => {
  return <ProfileBox member={members[0]} />
}

export default { title: 'Components/ProfileBox' }
