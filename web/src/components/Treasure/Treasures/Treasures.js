import { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'

import CardsListWrapper from 'src/components/CardsListWrapper'
import GameCard from 'src/components/Game/GameCard'
import InfiniteScroll from 'src/components/InfiniteScroll'
import LoadingDots from 'src/components/LoadingDots'

import { CardSkeleton } from 'src/components/LoadingSkeleton'

const TreasuresList = ({ treasures, count, onLoadMore, page, loading }) => {
  const loader = (
    <CardsListWrapper>
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <CardSkeleton key={index} />
        ))}
    </CardsListWrapper>
  )

  return (
    <div className="w-full">
      <div className="w-full flex justify-start">
        <div className="mr-2 flex align-center h-4">
          {count !== undefined ? (
            <p>{count.toLocaleString()}</p>
          ) : (
            <div className="flex h-4 align-center justify-center w-8">
              <LoadingDots />
            </div>
          )}
        </div>
        <p>Treasures</p>
      </div>
      <div className="mt-4 ">
        {!treasures?.length && loading ? (
          loader
        ) : (
          <InfiniteScroll
            onLoadMore={onLoadMore}
            count={count}
            perPage={TREASURES_PER_PAGE}
            page={page}
            loader={loader}
            dataLength={treasures?.length}
          >
            <div className="mb-4">
              <CardsListWrapper>
                {treasures.map((treasure, index) => (
                  <GameCard key={treasure.id + index} game={treasure} />
                ))}
              </CardsListWrapper>
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

export default TreasuresList
