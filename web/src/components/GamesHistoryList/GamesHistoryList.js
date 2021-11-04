import PropTypes from 'prop-types'
import { P, H3 } from 'src/components/Typography'
import ListItem from './components/ListItem/ListItem'

const GamesHistoryList = ({ games, onMintClick }) => {
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
          const { player1, player2, date, id } = game
          return (
            <ListItem
              key={id}
              player1={player1}
              player2={player2}
              date={date}
              id={id}
              onSubmit={handleSubmit}
            />
          )
        })}
      </div>
    </div>
  )
}

GamesHistoryList.propTypes = {
  games: PropTypes.object.isRequired,
  onMintClick: PropTypes.func.isRequired,
}

export default GamesHistoryList
