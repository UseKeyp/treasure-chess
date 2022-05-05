const FilterPriceInput = ({ value = '', setValue }) => {
  const moneyRegex = /^[0-9]*$/

  const handleChange = (event) => {
    // allows form clearing
    if (event.target.value === '') {
      setValue('')
    }
    // no non-number inputs
    if (!moneyRegex.test(event.target.value)) {
      setValue(value)
    }
    // limit inputs
    if (moneyRegex.test(event.target.value)) {
      if (event.target.value.length <= 6) {
        setValue(event.target.value)
      }
      if (event.target.value.length > 6) {
        setValue((v) => v)
      }
    }
  }

  return (
    <div className="filterPriceWrapper">
      <span
        aria-hidden="true"
        className="absolute left-3 top-2.5 pointer-events-none"
      >
        $
      </span>
      <input
        type="text"
        className="filterPriceInput"
        placeholder="Price"
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default FilterPriceInput
