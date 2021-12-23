import { useAuth } from '@redwoodjs/auth'
import { P, H3 } from 'src/components/Typography'

import { getOutcomeText } from 'src/utils/helpers'
import { useMinting } from 'src/providers/minting'

import { GamesContext, MintingContext } from 'src/providers/games'
import LoadingDots from 'src/components/LoadingDots'

import ListItem from './components/ListItem/ListItem'

import {
  ADDING_FUNDS,
  MINTING,
  _SUCCESS,
} from 'src/providers/minting/constants'

const Games = ({ games }) => {
  const { currentUser } = useAuth()
  const { mint, mintingStatus } = useMinting()

  const [gamesContext, setGamesContext] = React.useContext(GamesContext)
  const { activeGame } = gamesContext

  const onSubmitMint = (title) => {
    mint({
      title,
      id: activeGame.id,
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
      // mintingStatus: null, // Reset after successful minting
    })
  }

  const onReset = () => {
    setGamesContext({
      ...gamesContext,
      gameTitle: '',
      // mintingStatus: null,
    })
  }

  const getItems = () => {
    if (!activeGame && mintingStatus === MINTING)
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
          mintingStatus={mintingStatus}
          errorText={mintADDING_FUNDSError?.message}
        />
      )
    })
  }

  React.useEffect(() => {
    setGamesContext({ ...gamesContext, gameTitle: '' })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

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
