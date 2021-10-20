const GameCard = ({ game }) => {
  return (
    <div className="m-6">
      Game Card
      <div className="rw-segment text-black p-4 h-64 overflow-y-scroll">
        {Object.keys(game).map((key, index) => (
          <div key={index}>
            {key}: {game[key]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameCard
