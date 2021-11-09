const icons = require('./icons')

const changeToWhite = (svgString) =>
  svgString.replace(/fill="black"/, 'fill="white"')

const getIconByPoints = ({ points, color }) => {
  let icon = pawn
  if (points == 2) icon = knight
  if (points == 3) icon = bishop
  if (points == 4) icon = rook
  if (points == 5) icon = queen
  if (color === 'black') return changeToWhite(icon)
  return icon
}

const getIconByName = ({ name, color }) => {
  const icon = icons[name]
  if (!icon) throw `No icon found for "${name}"`
  if (color === 'black') return changeToWhite(icon)
  return icon
}

module.exports = { getIconFromPoints, getIconByName }
