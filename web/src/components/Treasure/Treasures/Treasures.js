import { useParams } from '@redwoodjs/router'

import { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'

import CardsListWrapper from 'src/components/CardsListWrapper'
import GameCard from 'src/components/Game/GameCard'
import Pagination from 'src/components/Pagination'

const TreasuresList = ({ treasures, count }) => {
  const { page, ...initialParams } = useParams()

  const onChangePage = (newPage) => {
    const searchParams = new URLSearchParams(initialParams)
    searchParams.append('page', newPage)
    const newPath = searchParams.toString()
    window.history.replaceState({}, '', newPath)
  }

  return (
    <div className="w-full ml-4">
      <p>{count} Treasures</p>
      <div className="mt-4">
        <CardsListWrapper>
          {treasures.map((treasure) => (
            <GameCard key={treasure.id} game={treasure} />
          ))}
        </CardsListWrapper>
      </div>
      <Pagination
        onChangePage={onChangePage}
        count={count}
        perPage={1}
        page={page}
      />
    </div>
  )
}

export default TreasuresList
