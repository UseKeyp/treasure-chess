import ReactTooltip from 'react-tooltip'

/**
 * Text will be rendered as text within the tooltip; if not provided, it will be blank or render 'TooltipChild'
 * TooltipChild accepts components that are rendered within the tooltip; it will take precedence over text
 * Position Options: Top (Default), Right, Bottom, Left
 * bgColor Options: Dark (Default), Success, Warning, Error, Info, Light
 * Effect Options: Float (Default), Solid
 **/

const Tooltip = ({
  children,
  position,
  text,
  effect,
  bgColor,
  tooltipChild,
}) => {
  if (text === '' || text === undefined) {
    text = 'React-tooltip'
  }
  return (
    <div data-tip={text}>
      {children}
      <ReactTooltip
        place={position}
        type={bgColor}
        effect={effect}
        clickable={true}
      >
        {tooltipChild}
      </ReactTooltip>
    </div>
  )
}

export default Tooltip
