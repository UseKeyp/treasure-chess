import { useParams } from '@redwoodjs/router'

import { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'

import CardsListWrapper from 'src/components/CardsListWrapper'
import GameCard from 'src/components/Game/GameCard'
import Pagination from 'src/components/Pagination'

import { TreasuresContext } from 'src/providers/context'

const TreasuresList = ({ treasures, count }) => {
  const [treasuresContext, setTreasuresContext] =
    React.useContext(TreasuresContext)
  const { page } = treasuresContext

  const onChangePage = (newPage) => {
    setTreasuresContext({ ...treasuresContext, page: newPage })
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
        perPage={TREASURES_PER_PAGE}
        page={page}
      />
    </div>
  )
}

export default TreasuresList
