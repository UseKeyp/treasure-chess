import PropTypes from 'prop-types'
import { P, H3 } from 'src/components/Typography'
import ListItem from './components/ListItem/ListItem'
import { formatDate, getOutcomeText } from 'src/utils/helpers'
import { useAuth } from '@redwoodjs/auth'

const Games = ({ games, onMintClick }) => {
  const { currentUser } = useAuth()

  const handleSubmit = (id, title) => {
    onMintClick(id, title)
  }

  // TODO: use title and setTitle from parent
  // TODO: Only one item can be selected
  // TODO: When a new item is selected, title should be cleared

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
              player1={whiteUsername}
              player2={blackUsername}
              date={date}
              id={id}
              onSubmit={handleSubmit}
              outcome={outcome}
            />
          )
        })}
      </div>
    </div>
  )
}

Games.propTypes = {
  games: PropTypes.object.isRequired,
  onMintClick: PropTypes.func.isRequired,
}

export default Games
