import { P } from 'src/components/Typography'

import Button from 'src/components/Button/Button'
import LoadingDots from 'src/components/LoadingDots'

const GameByIdForm = ({ setQuery, initialQuery }) => {
  const [inputValue, setInputValue] = React.useState('')
  const [errorText, setErrorText] = React.useState('')

  const handleChange = (e) => {
    if (isMinting) return
    setErrorText('')
    setInputValue(e.target.value)

    const error = validate(inputValue)
    if (error) return setErrorText(error)
    setErrorText('')
    setQuery(inputValue)
  }

  const validate = (str) => {
    if (!str.match(/[^https://chess.com]/))
      return `Invalid game URL. It should look like "".`
    return ''
  }

  return (
    <div className="games-history-list__mint-section">
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          placeholder="Game Title"
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
