import { useAuth } from '@redwoodjs/auth'

import { P, H3 } from 'src/components/Typography'
import Table from 'src/components/Table'
import LoadingDots from 'src/components/LoadingDots'

import { getOutcomeText } from 'src/utils/helpers'
import { useMinting } from 'src/providers/minting'

import { GamesContext } from 'src/providers/games'

import ListItem from './components/ListItem/ListItem'

import { MINT_STATUS_MINTING } from 'src/providers/minting/constants'

const TITLE = 'Games'

const Games = ({ games, isLoading }) => {
  const { currentUser } = useAuth()
  const { mint, cancelMint, mintStatus } = useMinting()

  const [gamesContext, setGamesContext] = React.useContext(GamesContext)
  const { activeGame } = gamesContext

  const onSubmitMint = (title) => {
    mint({
      title,
      gameId: activeGame.id,
      endTime: activeGame.endTime,
    })
  }

  const onChangeTitle = (title) => {
    setGamesContext({ ...gamesContext, gameTitle: title })
  }

  const onClickRow = (gameId) => {
    const game = games.find((game) => game.id === gameId)
    setGamesContext({
      ...gamesContext,
      activeGame: game,
      gameTitle: '',
    })
  }

  const onReset = () => {
    cancelMint({ gameId: activeGame.id, endTime: activeGame.endTime })
    setGamesContext({
      ...gamesContext,
      gameTitle: '',
    })
  }

  const getItems = () => {
    if (!activeGame && mintStatus === MINT_STATUS_MINTING)
      return (
        <div className="games-history-list__status">
          Your Treasure is being minted.
          <div className="games-history-list__loading-status">
            This can take up to 3 minutes.
            <LoadingDots className="ml-2" />
          </div>
        </div>
      )
    return games.map((game) => {
      const outcome = getOutcomeText({
        username: currentUser?.username,
        game,
      })
      return (
        <ListItem
          key={game.id}
          game={game}
          onReset={onReset}
          outcome={outcome}
          onClick={onClickRow}
          onChangeTitle={onChangeTitle}
          onSubmit={onSubmitMint}
          isExpanded={game.id === activeGame?.id}
        />
      )
    })
  }

  React.useEffect(() => {
    setGamesContext({ ...gamesContext, gameTitle: '' })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  if (isLoading) return <Table title={TITLE} isLoading height={500} />

  return (
    <div className="games-history-list">
      <div className="games-history-list__heading">
        <H3 mr={10}>Games</H3>
        <P fontSize={12} color="grey">
          {games.length} Games
        </P>
      </div>
      <div className="games-history-list__items">{getItems()}</div>
    </div>
  )
}

export default Games
