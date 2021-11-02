import { Link, routes } from '@redwoodjs/router'

import Members from 'src/components/Member/Members'

export const QUERY = gql`
  query MEMBERS {
    members {
      id
      username
      address
      rating
      imageSrc
      country
      masterTitle
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No members yet. '}
      <Link to={routes.newMember()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ members }) => {
  return <Members members={members} />
}
