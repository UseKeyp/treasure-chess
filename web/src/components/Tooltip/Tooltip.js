import ReactTooltip from 'react-tooltip'

/**
 * Text will be rendered as text within the tooltip; if not provided, it will be blank or render 'TooltipChild'
 * TooltipChild accepts components that are rendered within the tooltip; it will take precedence over text
 * Position Options: Top (Default), Right, Bottom, Left
 * bgColor Options: Dark (Default), Success, Warning, Error, Info, Light
 * Effect Options: Float (Default), Solid
 * A unique ID for each tooltip must be provided to prevent duplicate rendering of tooltips
 **/

const Tooltip = ({
  children,
  position,
  text,
  effect,
  bgColor,
  tooltipChild,
  id,
}) => {
  if (!text) {
    text = ''
  }
  return (
    <div data-tip={text} data-for={id}>
      {children}
      <ReactTooltip
        id={id}
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
