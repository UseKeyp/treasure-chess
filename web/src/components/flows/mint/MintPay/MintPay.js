import PropTypes from 'prop-types'

const MintPay = (props) => {
  return (
    <div className="mint-pay">
      <p className="mint-pay__title">${props.cash} USD</p>
      <div className="mint-pay__payment-container"></div>
      <button
        className="rect-button green rw-button rw-button-blue mint-pay__pay-action"
        onClick={props.onClick}
      >
        Pay ${props.cash} with Credit Card
      </button>
    </div>
  )
}

MintPay.propTypes = {
  cash: PropTypes.number.isRequired,
  onClick: PropTypes.any.isRequired,
}

export default MintPay
