import ChessIcon from 'src/components/Icon/Icon'
import { useState, useEffect } from 'react'
import Tooltip from 'src/components/Tooltip/Tooltip'

const Chip = ({ variant, label, icon }) => {
  const [chipLabel, setLabel] = useState(' ')
  const [isCreditVariant, setCreditVariant] = useState(false)
  const [Icon, setIcon] = useState(
    <div className="bg-chessBlack-200 h-4 w-4 rounded-md" />
  )
  const [tooltipMsg, setTooltipMsg] = useState('')

  // useEffect for setting values coming from component
  // properties
  useEffect(() => {
    label && setLabel(label)
    icon && setIcon(icon)
  }, [])

  // useEffect for asserting the variant of the Chip
  useEffect(() => {
    variant === 'credit' && setCreditVariant(true)
  }, [])

  // useEffect for setting up the variant and his particularities
  useEffect(() => {
    if (isCreditVariant) {
      setLabel('+1')
      setIcon(<ChessIcon name="treasure_chess" color="#ffffff" height="1rem" />)
      setTooltipMsg('you earned +1 mint credit for connecting twitch account')
    }
  }, [setLabel, label, isCreditVariant, setTooltipMsg, tooltipMsg])

  return (
    <Tooltip
      id="chip-label"
      effect="float"
      position="right"
      bgColor="dark"
      text={tooltipMsg}
    >
      <div className="rounded-md max-h-8 px-2 min-h-5 py-0.25 text-sm bg-greyDark">
        <div className="flex flex-nowrap justify-center items-center">
          <div className="mr-2">{chipLabel}</div>
          {Icon}
        </div>
      </div>
    </Tooltip>
  )
}

export default Chip
