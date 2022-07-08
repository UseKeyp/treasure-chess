import ChessIcon from 'src/components/Icon/Icon'

const Chip = ({ variant }) => {
  return (
    <div className="bg-greyDark rounded-md ml-2 max-h-8 px-2 min-h-5 py-0.25 text-sm">
      <div className="flex flex-nowrap justify-center items-center">
        <div className="mr-2">{variant === 'credit' && '+1'}</div>
        <ChessIcon name="treasure_chess" color="#ffffff" height="1rem" />
      </div>
    </div>
  )
}

export default Chip
