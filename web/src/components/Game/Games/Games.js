import { useAuth } from '@redwoodjs/auth'

import { Context } from 'src/providers/context'
import { getOutcomeText } from 'src/utils/helpers'
import { P, H3 } from 'src/components/Typography'

import ListItem from './components/ListItem/ListItem'

import {
  UNMINTED,
  CHECKOUT,
  MINTING,
  SUCCESS,
} from 'src/components/Game/Games/constants'

const Games = ({ games }) => {
  const [context, setContext] = React.useContext(Context)
  const { activeGame, mintingStatus } = context

  const { currentUser } = useAuth()

  const onSubmitMint = (gameId, title) => {
    setContext({ ...context, mintingStatus: CHECKOUT })
  }

  const onChangeTitle = (title) => {
    setContext({ ...context, gameTitle: title })
  }

  const onClickRow = async (gameId) => {
    const game = games.find((game) => game.id === gameId)
    setContext({ ...context, activeGame: game, gameTitle: '' })
  }

  React.useEffect(() => {
    setContext({ ...context, activeGame: games[0], gameTitle: '' })
  }, [])

  return (
    <div className="games-history-list">
      <div className="games-history-list__heading">
        <H3 mr={10}>Games</H3>
        <P fontSize={12} color="grey">
          {games.length} Games
        </P>
      </div>
      <div className="games-history-list__items">
        {games.map((game) => {
          const outcome = getOutcomeText({
            username: currentUser.username,
            game,
          })
          return (
            <ListItem
              key={game.id}
              game={game}
              // game={{ ...game, tokenId: 1, title: 'My Title' }}
              outcome={outcome}
              onClick={onClickRow}
              onChangeTitle={onChangeTitle}
              onSubmit={onSubmitMint}
              isExpanded={game.id === activeGame?.id}
              mintingStatus={mintingStatus}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Games
