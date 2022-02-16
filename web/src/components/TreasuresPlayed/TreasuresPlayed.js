import React from 'react'
import TreasuresOwned from './TreasuresOwned'
import { games } from './data.js'
import Dropdown from 'src/components/Dropdown/Dropdown'

const TreasuresPlayed = ({ data }) => {
  const filter = ['Newest First', 'Newest Last']
  const datagames = data ?? games
  return (
    <div className="max-w-[1084px] mx-auto">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <h2>Treasures Owned</h2>
        <div className="mx-auto md:mx-0 w-[260px]">
          <Dropdown options={filter} queryFilter={filter[0]} />
        </div>
      </div>

      <div className="cardContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {datagames.map((game) => (
          <TreasuresOwned
            game={game}
            gameAmount={game.gameAmount}
            key={game.id}
          />
        ))}
      </div>
    </div>
  )
}

export default TreasuresPlayed
