import { Link, routes } from '@redwoodjs/router'
import CardsListWrapper from 'src/components/CardsListWrapper'
const TreasuresList = ({ treasures }) => {
  return (
    <CardsListWrapper>
      {treasures.map((treasure) => (
        <div className="m-4" key={treasure.id}>
          {treasure.title}
        </div>
      ))}
    </CardsListWrapper>
  )
}

export default TreasuresList
