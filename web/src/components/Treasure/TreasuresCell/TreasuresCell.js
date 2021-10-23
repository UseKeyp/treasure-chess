import { Link, routes } from '@redwoodjs/router'

import Treasures from 'src/components/Treasure/Treasures'

export const QUERY = gql`
  query TREASURES {
    treasures {
      id
      createdAt
      blackId
      blackUsername
      whiteId
      whiteUsername
      winnerId
      winnerUsername

      title
      cardColor
      blackRating
      whiteRating
      blackMasterTitle
      whiteMasterTitle
      timeControl
      termination
      endTime
      outcome
      event
      ruleVariant
      externalUrl
      opening
      achievements
      achievementScore
      rarity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No treasures yet. '}
      <Link to="" className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ treasures }) => {
  return <Treasures treasures={treasures} />
}
