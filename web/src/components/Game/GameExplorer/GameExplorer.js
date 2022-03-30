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
  const [gamesContext, setGamesContext] = React.useContext(GamesContext)
  const { mintStatus } = useMinting()
  const { activeGame, gameTitle, filter, page } = gamesContext

  const isMinting = [MINT_STATUS_ADDING_FUNDS, MINT_STATUS_MINTING].includes(
    mintStatus
  )

  const onChangeFilter = (newFilter) => {
    // Prevent change during mint
    if (isMinting) return
    const filterParams = new URLSearchParams(newFilter)
    filterParams.sort()
    setGamesContext({
      ...gamesContext,
      page: undefined,
      count: undefined,
      filter: filterParams.toString(),
    })
  }
  return (
    <div className="w-full">
      <div className="mb-4">
        <FilterItems onChange={onChangeFilter} />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
        <GamesCell filter={filter} page={page} />
        <GameCard
          game={activeGame}
          isMinting={mintStatus === MINT_STATUS_MINTING}
          title={gameTitle}
          showGif={activeGame?.tokenId}
        />
      </div>
    </div>
  )
}

export default GameExplorer
