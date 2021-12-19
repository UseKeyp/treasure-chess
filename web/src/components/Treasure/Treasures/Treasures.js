import { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'

import CardsListWrapper from 'src/components/CardsListWrapper'
import GameCard from 'src/components/Game/GameCard'
import InfiniteScroll from 'src/components/InfiniteScroll'

import { CardSkeleton } from 'src/components/LoadingSkeleton'

import { TreasuresContext } from 'src/providers/context'

const TreasuresList = ({ treasures, count }) => {
  const [treasuresContext, setTreasuresContext] =
    React.useContext(TreasuresContext)
  const { page = 1 } = treasuresContext

  const onChangePage = (newPage) => {
    setTreasuresContext({ ...treasuresContext, page: newPage })
  }
  const loader = Array(3)
    .fill(null)
    .map(() => (
      <CardsListWrapper>
        <CardSkeleton />
      </CardsListWrapper>
    ))
  return (
    <div className="w-full ml-4">
      <p>{count} Treasures</p>
      <div className="mt-4">
        <InfiniteScroll
          onChangePage={onChangePage}
          count={count}
          perPage={TREASURES_PER_PAGE}
          page={page}
          loader={loader}
        >
          <CardsListWrapper>
            {treasures.map((treasure, index) => (
              <GameCard key={treasure.id + index} game={treasure} />
            ))}
          </CardsListWrapper>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default TreasuresList
