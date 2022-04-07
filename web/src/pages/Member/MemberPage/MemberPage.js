import MemberCell from 'src/components/Member/MemberCell'
import { MetaTags } from '@redwoodjs/web'

const MemberPage = ({ usernameOrAddress }) => {
  return (
    <>
      <MetaTags
        title={usernameOrAddress || 'Player'}
        description="Check out this player's Treasures."
      />
      <MemberCell usernameOrAddress={usernameOrAddress} />
    </>
  )
}

export default MemberPage
