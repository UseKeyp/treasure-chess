import { P } from 'src/components/Typography'

import Button from 'src/components/Button/Button'
import LoadingDots from 'src/components/LoadingDots'

const GameByIdForm = ({ setQuery, initialQuery }) => {
  const [inputValue, setInputValue] = React.useState('')
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
      const url = new URL(str)
      if (!url.hostname.match(/chess.com/))
        return 'Only games played on Chess.com are supported'
      if (!url.pathname.match(/[0-9]$/))
        return `Invalid URL, it should look like "https://www.chess.com/game/live/43432194983"`
    } catch (e) {
      return `Invalid URL or Game ID, it should look like "43432194983" or "https://www.chess.com/game/live/43432194983"`
    }
    return ''
  }

  const transparentWhite = 'rgba(255, 255, 255, 0.6)'
  return (
    <div className="games-history-list__mint-section">
      <div className="filter-items__input-wrap w-full">
        <h4
          fontSize={11}
          fontWeight="bold"
          color={transparentWhite}
          mt="1rem"
          className="mb-2"
        >
          URL or Game ID
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
