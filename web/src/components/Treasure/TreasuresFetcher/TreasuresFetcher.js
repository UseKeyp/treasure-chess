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
  const [treasures, setTreasures] = React.useState([])
  const [count, setCount] = React.useState([])
  const [page, setPage] = React.useState(0)

  const [getTreasures, { error, loading }] = useLazyQuery(
    TREASURES_WITH_FILTER,
    {
      onCompleted: ({ treasurePage }) => {
        if (page === 0) {
          setTreasures(treasurePage.treasures)
          setCount(treasurePage.count)
          return
        }
        setTreasures([...treasures, ...treasurePage.treasures])
      },
    }
  )

  const loadMore = async () => {
    console.log('loading more')
    const newPage = page + 1
    setPage(newPage)
    await getTreasures({
      variables: { username, filter, sort, page: newPage },
    })
  }
  const load = async () => {
    console.log('loading new query')
    await getTreasures({ variables: { username, filter, sort, page: 0 } })
  }

  React.useEffect(() => {
    load()
  }, [username, filter, sort])

  // TODO: add scroll to top button
  // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

  if (error) return <div className="rw-text-center">Something went wrong</div>
  if (!treasures && loading)
    return <div className="rw-text-center">Loading...</div>
  if (!treasures && !loading)
    return <div className="rw-text-center">No treasures found</div>
  return (
    <Treasures
      treasures={treasures}
      count={count}
      onLoadMore={loadMore}
      page={page}
    />
  )
}

export default TreasuresFetcher
