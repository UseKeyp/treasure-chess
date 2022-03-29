import Button from 'src/components/Button'

const Pagination = ({ page, count, perPage, onChangePage }) => {
  if (!count) return null
  const items = []
  const addButton = ({ text, page }) =>
    items.push(
      <Button key={page} onClick={() => onChangePage(page)}>
        {text}
      </Button>
    )

  const totalPages = Math.ceil(count / perPage)

  if (page > 2) addButton({ text: '<<', page: 1 })
  if (page > 1) addButton({ text: '<', page: page - 1 })
  items.push(
    <div key={page} className="inline-block mx-1 x-3 ">
      {page} of {totalPages}
    </div>
  )
  if (page < totalPages) addButton({ text: '>', page: page + 1 })
  if (page < totalPages - 5) addButton({ text: '>>', page: page + 5 })
  return <div className="text-lg font-semibold flex">{items}</div>
}

export default Pagination
