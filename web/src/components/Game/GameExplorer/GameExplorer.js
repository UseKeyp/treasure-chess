import GamesCell from 'src/components/Game/GamesCell'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'

import { GamesContext } from 'src/providers/context/GamesContext'

import { CHECKOUT, MINTING } from 'src/components/Game/Games/constants'

const GameExplorer = () => {
  const [context] = React.useContext(GamesContext)
  const { activeGame, mintingStatus } = context
  const [filter, setFilter] = React.useState()
  const onChangeFilter = (newFilter) => {
    if (mintingStatus === CHECKOUT || mintingStatus === MINTING) return
    const filterParams = new URLSearchParams(newFilter)
    filterParams.sort()
    setFilter(filterParams.toString())
  }

  return (
    <div className="grid grid-rows-1">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div style={{ width: 330 }}>
          <FilterItems headline="Filter Games" onChange={onChangeFilter} />
        </div>
        <GamesCell filter={filter} />
        <GameCard game={activeGame} />
      </div>
    </div>
  )
}

export default GameExplorer
