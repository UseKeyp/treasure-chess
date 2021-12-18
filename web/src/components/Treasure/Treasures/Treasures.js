import CardsListWrapper from 'src/components/CardsListWrapper'
import GameCard from 'src/components/Game/GameCard'
const TreasuresList = ({ treasures }) => {
  return (
    <CardsListWrapper className="flex">
      {treasures.map((treasure) => (
        <GameCard key={treasure.id} game={treasure} />
      ))}
    </CardsListWrapper>
  )
}

export default TreasuresList
