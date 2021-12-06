import { P } from 'src/components/Typography'

import Button from 'src/components/Button/Button'

import ProfanityFilter from 'bad-words'
const profanityFilter = new ProfanityFilter()

const MintForm = ({
  onSubmit,
  onChangeTitle,
  isMinting,
  errorText: queryErrorText,
}) => {
  const [inputValue, setInputValue] = React.useState('')
  const [errorText, setErrorText] = React.useState('')

  const handleChange = (e) => {
    if (isMinting) return
    setErrorText('')
    setInputValue(e.target.value)
    onChangeTitle(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  const handleSubmit = (e) => {
    setErrorText('')
    e.stopPropagation()
    const error = validateTitle(inputValue)
    if (error) return setErrorText(error)
    onSubmit(inputValue)
  }

  const validateTitle = (str) => {
    if (
      !str.match(
        /[\uD800-\uDBFF \uDC00-\uDFFF a-z A-Z 0-9 !@#$*%^&()+=-[\]';.\\\/{}|":<>\?]/
      )
    )
      return `Only alphanumeric characters, emojis, and the symbols !@#$%^&*()+=-[]\\/|';.{}":<>? are allowed.`
    if (profanityFilter.isProfane(str)) return 'Potty mouth!'
    if (str.includes(',')) return `No "," characters allowed`
    return ''
  }

  React.useEffect(() => {
    setInputValue('')
  }, [])

  React.useEffect(() => {
    setErrorText(queryErrorText)
  }, [queryErrorText])

  return (
    <div className="games-history-list__mint-section">
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          placeholder="Game Title"
          className="games-history-list__input"
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button variant="green" onClick={handleSubmit}>
          Mint
        </Button>
      </div>
      {errorText && (
        <P pt={'.5rem'} fontSize={13} fontWeight={500} color="#DA413E">
          {errorText}
        </P>
      )}
    </div>
  )
}
export default MintForm
