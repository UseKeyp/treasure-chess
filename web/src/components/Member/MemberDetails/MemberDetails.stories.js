import MemberDetails from './MemberDetails'

import members from '../../../../../scripts/seed/member'

export const generated = () => {
  return <MemberDetails member={members[0]} />
}

export default { title: 'Components/MemberDetails' }
