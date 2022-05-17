import MemberCell from 'src/components/Member/MemberCell'
import { MetaTags } from '@redwoodjs/web'
import { useLocale } from 'src/providers/locale/locale.js'

const MemberPage = ({ usernameOrAddress }) => {
  return (
    <>
      <MetaTags
        title={usernameOrAddress || 'Player'}
        description={t("Check out this player's Treasures.")}
      />
      <MemberCell usernameOrAddress={usernameOrAddress} />
    </>
  )
}

export default MemberPage
