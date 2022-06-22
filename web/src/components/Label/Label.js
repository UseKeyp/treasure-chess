import ChessIcon from 'src/components/Icon/Icon'
import { useState, useEffect } from 'react'

const Chip = ({ variant, label, icon }) => {
  const [chipLabel, setLabel] = useState(' ')
  const [isCreditVariant, setCreditVariant] = useState(false)
  const [Icon, setIcon] = useState(
    <div className="bg-chessBlack-200 h-4 w-4 rounded-md" />
  )

  useEffect(() => {
    label && setLabel(label)
    icon && setIcon(icon)
  }, [])

  useEffect(() => {
    variant === 'credit' && setCreditVariant(true)
  }, [])

  useEffect(() => {
    if (isCreditVariant) {
      setLabel('+1')
      setIcon(<ChessIcon name="treasure_chess" color="#ffffff" height="1rem" />)
    }
  }, [setLabel, label, isCreditVariant])

  return (
    <div className="rounded-md max-h-8 px-2 min-h-5 py-0.25 text-sm bg-greyDark">
      <div className="flex flex-nowrap justify-center items-center">
        <div className="mr-2">{chipLabel}</div>
        {Icon}
      </div>
    </div>
  )
}

export default Chip
