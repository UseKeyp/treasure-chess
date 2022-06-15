import { P } from 'src/components/Typography'

import Button from 'src/components/Button/Button'
import LoadingDots from 'src/components/LoadingDots'
import { debounce } from 'src/utils/helpers'

import ProfanityFilter from 'bad-words'
const profanityFilter = new ProfanityFilter()
profanityFilter.removeWords('Pawn', 'pawn')

const MintForm = ({
  onSubmit,
  onChangeTitle,
  isMinting,
  mintLoading,
  errorText: queryErrorText,
}) => {
  const [inputValue, setInputValue] = React.useState('')
  const [errorText, setErrorText] = React.useState('')

  const debounceChange = debounce((args) => {
    onChangeTitle(...args)
    setErrorText('')
  }, 1000)

  const handleChange = (e) => {
    if (isMinting) return
    setInputValue(e.target.value)
    debounceChange(e.target.value)
  }

  const handleSubmit = () => {
    const error = validateTitle(inputValue)
    if (error) return setErrorText(error)
    setErrorText('')
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
    if (str.length > 25) return `Title must be 25 characters or less`
    return ''
  }

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
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          disabled={mintLoading}
          variant={mintLoading ? 'grey' : 'green'}
        >
          {mintLoading ? <LoadingDots /> : 'Mint'}
        </Button>
      </div>
      {errorText && (
        <P pt={'.5rem'} fontSize={13} fontWeight={700} color="#FFBB0D">
          {errorText}
        </P>
      )}
    </div>
  )
}
export default MintForm
