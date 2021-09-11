import PropTypes from 'prop-types'

import loadingChessBoard from './Chess_Board_Loading.png'

const MintProcessing = (props) => {
  // temporary logic to present behavior
  React.useEffect(() => {
    setTimeout(() => props.onClick(), 2000)
  }, [props])

  return (
    <div className="mint-processing">
      <div className="mint-processing__chess-container">
        <img src={loadingChessBoard} alt="loading-empty-chess-board" />
      </div>
      <button
        className="button button--grey mint-processing__processing-action"
        disabled
        onClick={props.onClick}
      >
        Processing
      </button>
    </div>
  )
}

MintProcessing.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default MintProcessing
