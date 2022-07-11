import { useLazyQuery } from '@apollo/client'
import { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'

import Carousel from 'src/components/Carousel'
import SeeMore from 'src/components/SeeMore'
import GameCard from 'src/components/Game/GameCard'
import Treasures from 'src/components/Treasure/Treasures'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

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

const TreasuresFetcher = ({
  username,
  owner,
  filter,
  sort,
  limit,
  seeMore,
  collapsedTreasures,
}) => {
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

  if (error)
    return <h2 className="rw-text-center">{t('Something went wrong')}</h2>
  return !collapsedTreasures ? (
    limit ? (
      !loading ? (
        <div className="w-full">
          <Carousel
            enableAutoSlide
            items={[
              ...treasures.map((treasure, idx) => (
                <GameCard disableAnimation key={idx} game={treasure} />
              )),
              treasures.length > 0 && <SeeMore key="seeMore" />,
            ]}
          />
          {treasures.length === 0 && count === 0 && (
            <div className="flex justify-start sm:justify-center">
              {t("That's everything")}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <Carousel
            enableAutoSlide
            items={[
              treasures.length < 1 && (
                <SkeletonTheme baseColor="#272522" highlightColor="#21201D">
                  <div className="flex flex-row space-x-8">
                    {Array(6)
                      .fill(null)
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          className="relative w-[266px] h-[476px] rounded-[12px]"
                          count={1}
                        />
                      ))}
                  </div>
                </SkeletonTheme>
              ),
            ]}
          />
        </div>
      )
    ) : (
      <Treasures
        treasures={treasures}
        count={count}
        onLoadMore={onLoadMore}
        page={page}
        limit={limit}
        loading={loading}
        seeMore={seeMore}
      />
    )
  ) : (
    <></>
  )
}

export default TreasuresFetcher
