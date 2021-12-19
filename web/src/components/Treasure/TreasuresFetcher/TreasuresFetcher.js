import { useLazyQuery } from '@apollo/client'

import Treasures from 'src/components/Treasure/Treasures'
import { TreasuresContext } from 'src/providers/context'

const TREASURES_WITH_FILTER = gql`
  query TreasuresSearchQuery(
    $username: String
    $filter: String
    $sort: String
    $page: Int
  ) {
    treasurePage: treasuresWithFilter(
      username: $username
      filter: $filter
      sort: $sort
      page: $page
    ) {
      count
      treasures {
        id
        gifUrl
        createdAt
        black {
          username
          id
          imageSrc
        }
        white {
          username
          id
          imageSrc
        }
        winner {
          username
          id
        }
        title
        cardColor
        blackRating
        blackRatingDelta
        whiteRatingDelta
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
  }
`

const TreasuresFetcher = ({ username, filter, sort }) => {
  const [{ page }] = React.useContext(TreasuresContext)

  const [treasures, setTreasures] = React.useState([])
  const [count, setCount] = React.useState([])

  const [getTreasures, { error, loading }] = useLazyQuery(TREASURES_WITH_FILTER)

  const loadMore = async () => {
    const {
      data: {
        treasurePage: { treasures: newTreasures, count: newCount },
      },
    } = await getTreasures({ variables: { username, filter, sort, page } })
    setTreasures([...treasures, ...newTreasures])
    setCount(newCount)
  }
  const load = async () => {
    const {
      data: {
        treasurePage: { treasures: newTreasures, count: newCount },
      },
    } = await getTreasures({ variables: { username, filter, sort, page: 0 } })
    console.log(newTreasures)
    // setTreasures([newTreasures])
    // setCount(newCount)
  }

  React.useEffect(() => {
    if (page > 1) loadMore()
  }, [page])
  React.useEffect(() => {
    load()
  }, [username, filter, sort])

  if (error) return <div className="rw-text-center">Something went wrong</div>
  if (!treasures && loading)
    return <div className="rw-text-center">Loading...</div>
  if (!treasures && !loading)
    return <div className="rw-text-center">No treasures found</div>
  return <Treasures treasures={treasures} count={count} />
}

export default TreasuresFetcher
