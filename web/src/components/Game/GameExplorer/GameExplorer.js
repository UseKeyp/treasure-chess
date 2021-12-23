import { useQuery } from '@apollo/client'

import GamesCell from 'src/components/Game/GamesCell'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'

import { useMinting } from 'src/providers/minting'
import { GamesContext } from 'src/providers/games'

import {
  ADDING_FUNDS,
  MINTING,
  COMPLETE,
  FAILED,
  SUCCESS,
} from 'src/providers/minting/constants'

const GameExplorer = () => {
  const [context, setContext] = React.useContext(GamesContext)
  const { mintingStatus } = useMinting()
  const { activeGame, gameTitle } = context
  const [filter, setFilter] = React.useState()

  const isMinting = [ADDING_FUNDS, MINTING].includes(mintingStatus)

  const onChangeFilter = (newFilter) => {
    // Prevent change during mint
    if (isMinting) return
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
        <GameCard
          game={activeGame}
          isMinting={mintingStatus === MINTING}
          title={gameTitle}
          showGif
        />
      </div>
    </div>
  )
}

export default GameExplorer
