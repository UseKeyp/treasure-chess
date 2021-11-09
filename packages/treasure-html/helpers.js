const formatDate = (rawString) => {
  const date = new Date(rawString)
  let options = { month: 'short' }
  const month = new Intl.DateTimeFormat('en-US', options).format(date)
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day} ${year}`
}

module.exports = { formatDate }
