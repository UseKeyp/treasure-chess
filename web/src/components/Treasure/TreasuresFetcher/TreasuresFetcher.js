import { useLazyQuery } from '@apollo/client'

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
        imageSrc
        id
      }
      white {
        imageSrc
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

const TreasuresFetcher = ({ username, owner, filter, sort }) => {
  const [treasures, setTreasures] = React.useState([])
  const [count, setCount] = React.useState()
  const [page, setPage] = React.useState(0)

  const [getTreasures, { error, loading }] = useLazyQuery(
    TREASURES_WITH_FILTER,
    {
      variables: { username, owner, filter, sort, page },
      onCompleted: ({ treasures: newTreasures }) => {
        if (page === 0) return setTreasures(newTreasures)
        setTreasures([...treasures, ...newTreasures])
      },
    }
  )
  const [getTreasuresCount] = useLazyQuery(TREASURES_WITH_FILTER_COUNT, {
    variables: { username, owner, filter },
    onCompleted: ({ count: newCount }) => {
      setCount(newCount)
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
    setCount()
    setTreasures([])
  }

  React.useEffect(() => {
    onNewSearch()
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
