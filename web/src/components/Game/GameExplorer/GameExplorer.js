import GamesCell from 'src/components/Game/GamesCell'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'

import { useMinting } from 'src/providers/minting'
import { GamesContext } from 'src/providers/games'

import {
  MINT_STATUS_ADDING_FUNDS,
  MINT_STATUS_MINTING,
} from 'src/providers/minting/constants'

const GameExplorer = () => {
  const [context] = React.useContext(GamesContext)
  const { mintStatus } = useMinting()
  const { activeGame, gameTitle } = context
  const [filter, setFilter] = React.useState()

  const isMinting = [MINT_STATUS_ADDING_FUNDS, MINT_STATUS_MINTING].includes(
    mintStatus
  )

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
          <FilterItems onChange={onChangeFilter} />
        </div>
        <GamesCell filter={filter} />
        <GameCard
          game={activeGame}
          isMinting={mintStatus === MINT_STATUS_MINTING}
          title={gameTitle}
        />
      </div>
    </div>
  )
}

export default GameExplorer
