import ChessIcon from 'src/components/Icon/Icon'
import { useState, useEffect } from 'react'
import Button from 'src/components/Button'

const Chip = ({ variant, label, icon }) => {
  const [chipLabel, setLabel] = useState(' ')
  const [isCreditVariant, setCreditVariant] = useState(false)
  const [Icon, setIcon] = useState(
    <div className="bg-chessBlack-200 h-4 w-4 rounded-md" />
  )

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
    }
  }, [setLabel, label, isCreditVariant])

  return (
    <Button data-variant="grey">
      <div className="rounded-md mx-2 max-h-8 px-2 min-h-5 py-0.25 text-sm">
        <div className="flex flex-nowrap justify-center items-center">
          <div className="mr-2">{chipLabel}</div>
          {Icon}
        </div>
      </div>
    </Button>
  )
}

export default Chip
