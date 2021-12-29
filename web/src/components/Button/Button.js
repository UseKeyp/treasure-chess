import PropTypes from 'prop-types'
import styles from './Button.module.scss'

const Button = ({ children, variant, onClick, ...rest }) => {
  return (
    <button className={`button button--${variant}`} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'grey',
  isDisabled: false,
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button

/**
 * A button following the new style
 * @param {String} label Provide the label you want the button to say
 * @param {Function} clickFunction Provide the function you want to attach to the 'click' event listener
 * @returns A nice button for you :)
 */
export const NewButton = (props) => {
  return (
    <button className={styles.button} onClick={() => props.clickFunction()}>
      {props.label || props.children}
    </button>
  )
}
