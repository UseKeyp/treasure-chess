import PropTypes from 'prop-types'
import { getColorFromTheme } from 'src/utils/helpers'

const getSpacingStyles = (props) => {
  return {
    paddingBottom: props.pb,
    paddingTop: props.pt,
    marginBottom: props.mb,
    marginTop: props.mt,
  }
}

const typographyPropTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.number,
  pb: PropTypes.number,
  pt: PropTypes.number,
  mb: PropTypes.number,
  mt: PropTypes.number,
}

export const H1 = ({ color: _color, children, size, ...rest }) => {
  const color = _color && getColorFromTheme(_color)
  const spacing = getSpacingStyles(rest)
  return <h1 style={{ color, fontSize: size, ...spacing }}>{children}</h1>
}
H1.propTypes = { ...typographyPropTypes }

export const H2 = ({ color: _color, children, size, ...rest }) => {
  const color = _color && getColorFromTheme(_color)
  const spacing = getSpacingStyles(rest)
  return <h2 style={{ color, fontSize: size, ...spacing }}>{children}</h2>
}
H2.propTypes = { ...typographyPropTypes }

export const H3 = ({ color: _color, children, size, ...rest }) => {
  const color = _color && getColorFromTheme(_color)
  const spacing = getSpacingStyles(rest)
  return <h3 style={{ color, fontSize: size, ...spacing }}>{children}</h3>
}
H3.propTypes = { ...typographyPropTypes }

export const P = ({ color: _color, children, size, ...rest }) => {
  const color = _color && getColorFromTheme(_color)
  const spacing = getSpacingStyles(rest)
  return <p style={{ color, fontSize: size, ...spacing }}>{children}</p>
}
P.propTypes = { ...typographyPropTypes }

const Typography = () => {}

export default Typography
