import { P, H3 } from 'src/components/Typography'
import ListItem from './components/ListItem/ListItem'
import { formatDate, getOutcomeText } from 'src/utils/helpers'
import { useAuth } from '@redwoodjs/auth'
import { Context } from 'src/providers/context'

const Games = ({ games, onMintClick }) => {
  const [context, setContext] = React.useContext(Context)
  const { activeGame } = context

  const { currentUser } = useAuth()

  const handleSubmit = (id, title) => {
    onMintClick(id, title)
  }

  const onChangeTitle = (title) => {
    setContext({ gameTitle: title, ...context })
  }

  const onSelectGame = (newGame) => {
    // TODO: Only one item can be selected
    setContext({ activeGame: newGame, gameTitle: '', ...context })
  }

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
          const { whiteUsername, blackUsername, endTime, id } = game
          const date = formatDate(endTime)
          return (
            <ListItem
              key={id}
              isExpanded={game.id === activeGame?.id}
              player1={whiteUsername}
              player2={blackUsername}
              date={date}
              id={id}
              onSubmit={handleSubmit}
              outcome={outcome}
              onChangeTitle={onChangeTitle}
              onSelectGame={onSelectGame}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Games
