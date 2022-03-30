import { trimAddress, isHexAddress } from 'src/utils/helpers'
import { routes, Link } from '@redwoodjs/router'

const MemberLink = ({ usernameOrAddress }) => {
  if (!usernameOrAddress) return <></>
  let linkText = usernameOrAddress
  if (isHexAddress(usernameOrAddress)) linkText = trimAddress(usernameOrAddress)

  return (
    <Link
      className="text-blueLink font-bold"
      to={routes.member({ usernameOrAddress })}
    >
      {linkText}
    </Link>
  )
}

export default MemberLink
