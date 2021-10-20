import ProfanityFilter from 'bad-words'

const profanityFilter = new ProfanityFilter()

export const isHexAddress = (address) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}

export const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null

export const isProduction =
  process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== null

export const isExpired = (expiration) => {
  return new Date(expiration) > new Date()
}

export const checkProfanity = (string) => {
  if (profanityFilter.isProfane(string))
    throw new Error('String contains profanity')
}

export const validateTreasureTitle = (string) => {
  checkProfanity(string)
  if (
    !string.match(
      /[\uD800-\uDBFF \uDC00-\uDFFF a-z A-Z 0-9 !@#$*%^&()+=-[\]';,.\\\/{}|":<>\?]/
    )
  )
    throw new Error(
      `Only alphanumeric characters, emojis, and the symbols !@#$%^&*()+=-[]\\/|';,.{}":<>? are allowed.`
    )
}
