import Avatar from 'src/components/Avatar'
import { trimAddress } from 'src/utils/helpers'
import { routes, Link } from '@redwoodjs/router'

const MemberLink = ({ member = {} }) => {
  let linkText = member.username
  if (!linkText) {
    if (!member.address) return <></>
    linkText = trimAddress(member.address)
  }

  return (
    <div className="flex items-center">
      <div className="mr-2">
        <Avatar src={member.imageSrc} size="16px" />
      </div>
      <p className="">
        <Link
          className="text-blueLink font-bold"
          to={routes.member({ usernameOrAddress: linkText })}
        >
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default MemberLink
