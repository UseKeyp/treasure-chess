import MemberCell from 'src/components/Member/MemberCell'
import { MetaTags } from '@redwoodjs/web'

const MemberPage = ({ usernameOrAddress }) => {
  return (
    <>
      <MetaTags
        title={usernameOrAddress || 'Member'}
        description="My Treasure Chess profile"
      />
      <MemberCell usernameOrAddress={usernameOrAddress} />
    </>
  )
}

export default MemberPage
