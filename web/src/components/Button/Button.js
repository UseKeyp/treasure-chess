import PropTypes from 'prop-types'

const Button = ({
  children,
  label,
  variant,
  onClick,
  size,
  textColor,
  isSelected,
  className,
  fluid,
  ...rest
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={() => onClick()}
      data-variant={variant}
      data-size={size}
      data-textcolor={textColor}
      data-selected={String(isSelected)}
      data-fluid={String(fluid)}
      {...rest}
    >
      {label || children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'transparent',
  size: 'regualr',
  textColor: 'white',
  isSelected: false,
  className: '',
  fluid: false,
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  textColor: PropTypes.string,
  isSelected: PropTypes.boolean,
  fluid: PropTypes.boolean,
  className: PropTypes.string,
}

export default Button
