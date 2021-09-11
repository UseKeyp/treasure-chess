import PropTypes from 'prop-types'

import loadedChessBoard from './Chess_Board_Loaded.png'

const MintComplete = (props) => {
  return (
    <div className="mint-complete">
      <div className="mint-complete__chess-container">
        <img src={loadedChessBoard} alt="loading-empty-chess-board" />
      </div>
      <button
        className="button button--gold mint-complete__complete-action"
        onClick={props.onClick}
      >
        View in Your Treasure Chest
      </button>
    </div>
  )
}

MintComplete.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default MintComplete
