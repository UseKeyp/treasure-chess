import MemberDetails from './MemberDetails'

import members from '../../../../../scripts/seed/member'

export const generated = () => {
  return <MemberDetails member={members[2]} />
}
export const profile = () => {
  return <MemberDetails member={members[2]} isProfile />
}

export default { title: 'Components/MemberDetails' }
