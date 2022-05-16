import { P } from 'src/components/Typography'

const GameByIdForm = ({ setQuery, initialQuery }) => {
  const [inputValue, setInputValue] = React.useState(initialQuery || '')
  const [errorText, setErrorText] = React.useState('')

  const handleChange = (e) => {
    setErrorText('')
    const value = e.target.value
    setInputValue(value)
    if (!value) return setQuery('')

    const error = validate(value)
    if (error) return setErrorText(error)
    setQuery(value)
  }

  const validate = (str) => {
    if (str.match(/^[0-9]+$/)) return ''
    try {
      if (!str.includes('chess.com'))
        return 'Only games played on Chess.com are supported'
      if (!str.includes('live')) return 'Only live games are supported'
      if (!str.match(/[0-9]$/))
        return `Invalid URL, it should look like "https://www.chess.com/game/live/43432194983"`
    } catch (e) {
      return `Invalid URL or Game ID, it should look like "43432194983" or "https://www.chess.com/game/live/43432194983"`
    }
    return ''
  }

  const transparentWhite = 'rgba(255, 255, 255, 0.6)'
  return (
    <div className="">
      <div className="filter-items__input-wrap w-full">
        <h4
          fontSize={11}
          fontWeight="bold"
          color={transparentWhite}
          mt="1rem"
          className="mb-2"
        >
          Search by URL
        </h4>
        <input
          type="text"
          value={inputValue}
          placeholder="https://www.chess.com/game/live/43432194983"
          className="games-history-list__input"
          onChange={handleChange}
        />
      </div>
      {errorText && (
        <P pt={'.5rem'} fontSize={13} fontWeight={500} color="#DA413E">
          {errorText}
        </P>
      )}
    </div>
  )
}
export default GameByIdForm
