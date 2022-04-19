import { useLazyQuery } from '@apollo/client'
import { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'

import Treasures from 'src/components/Treasure/Treasures'

const TREASURES_WITH_FILTER = gql`
  query TreasuresSearchQuery(
    $username: String
    $owner: String
    $filter: String
    $sort: String
    $page: Int
  ) {
    treasures: treasuresWithFilter(
      username: $username
      owner: $owner
      filter: $filter
      sort: $sort
      page: $page
    ) {
      id
      createdAt
      black {
        username
        country
        imageSrc
        id
      }
      white {
        imageSrc
        country
        username
        id
      }
      winner {
        username
        id
      }
      title
      cardColor
      blackRating
      whiteRating
      blackRatingDelta
      whiteRatingDelta
      blackMasterTitle
      whiteMasterTitle
      timeControl
      termination
      endTime
      outcome
      event
      moves
      gifUrl
      boardLayout
      ruleVariant
      externalUrl
      opening
      achievements
      achievementScore
      rarity
      tokenId
      marketSaleStatus
      marketSales {
        id
        amount
        status
      }
    }
  }
`
const TREASURES_WITH_FILTER_COUNT = gql`
  query TreasuresCountQuery(
    $username: String
    $owner: String
    $filter: String
  ) {
    count: treasuresWithFilterCount(
      username: $username
      owner: $owner
      filter: $filter
    )
  }
`

const TreasuresFetcher = ({ username, owner, filter, sort, limit }) => {
  const [treasures, setTreasures] = React.useState([])
  const [count, setCount] = React.useState()
  const [page, setPage] = React.useState(0)

  const [getTreasures, { error, loading }] = useLazyQuery(
    TREASURES_WITH_FILTER,
    {
      variables: { username, owner, filter, sort, page },
      fetchPolicy: 'network-only',
      onCompleted: ({ treasures: newTreasures }) => {
        if (page === 0) return setTreasures(newTreasures)
        setTreasures([...treasures, ...newTreasures])
      },
    }
  )
  const [getTreasuresCount] = useLazyQuery(TREASURES_WITH_FILTER_COUNT, {
    variables: { username, owner, filter },
    fetchPolicy: 'network-only',
    onCompleted: ({ count: newCount }) => {
      setCount(
        limit && newCount > TREASURES_PER_PAGE ? TREASURES_PER_PAGE : newCount
      )
    },
  })

  const onLoadMore = () => {
    setPage(page + 1)
    getTreasures()
  }

  const onNewSearch = () => {
    getTreasures()
    getTreasuresCount()
    setPage(0)
    setTreasures([])
  }

  React.useEffect(() => {
    onNewSearch()
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [username, filter])

  // TODO: add button to scroll to top
  // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

  if (error) return <h2 className="rw-text-center">Something went wrong</h2>
  return (
    <Treasures
      treasures={treasures}
      count={count}
      onLoadMore={!limit && onLoadMore}
      page={page}
      loading={loading}
    />
  )
}

export default TreasuresFetcher
