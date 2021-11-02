import CardsListWrapper from 'src/components/CardsListWrapper'
const TreasuresList = ({ treasures }) => {
  return (
    <CardsListWrapper className="flex">
      {treasures.map((treasure) => (
        <div key={treasure.id}>
          title: {treasure.title}
          <br />
          opening: {treasure.opening}
          <br />
          black: {treasure.blackUsername}
          <br />
          white: {treasure.whiteUsername}
          <br />
          winner: {treasure.outcome}
          <br />
        </div>
      ))}
    </CardsListWrapper>
  )
}

export default TreasuresList
