import Table from 'src/components/Table/Table'

const GameCard = ({ game }) => {
  return (
    <>
      {Object.keys(game).map((key, index) => (
        <div key={index}>
          {key}: {game[key]}
        </div>
      ))}
    </>
  )
}

export default GameCard
