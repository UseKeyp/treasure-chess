import { useLazyQuery } from '@apollo/client'

import Treasures from 'src/components/Treasure/Treasures'

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
      variables: { username, filter, sort, page },
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

  const onLoadMore = () => {
    setPage(page + 1)
    getTreasures()
  }

  React.useEffect(() => {
    setPage(0)
    setTreasures([])
    getTreasures()
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [username, filter, sort])

  // TODO: add button to scroll to top
  // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

  if (error) return <h2 className="rw-text-center">Something went wrong</h2>

  return (
    <Treasures
      treasures={treasures}
      count={count}
      onLoadMore={onLoadMore}
      page={page}
      loading={loading}
    />
  )
}

export default TreasuresFetcher
