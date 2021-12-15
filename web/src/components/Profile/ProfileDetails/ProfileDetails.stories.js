import ProfileDetails from './ProfileDetails'

import members from '../../../../scripts/seed/member'

export const generated = () => {
  return <ProfileDetails member={members[0]} />
}

export default { title: 'Components/ProfileDetails' }
