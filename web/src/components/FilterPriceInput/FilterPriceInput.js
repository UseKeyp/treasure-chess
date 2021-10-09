import styles from './FilterPriceInput.module.scss'

const FilterPriceInput = (props) => {
  const moneyRegex = /^[0-9]*$/

  const handleChange = (event) => {
    // allows form clearing
    if (event.target.value === '') {
      props.setValue('')
    }
    // no non-number inputs
    if (!moneyRegex.test(event.target.value)) {
      props.setValue(props.value)
    }
    // limit inputs
    if (moneyRegex.test(event.target.value)) {
      if (event.target.value.length <= 6) {
        props.setValue(event.target.value)
      }
      if (event.target.value.length > 6) {
        props.setValue((v) => v)
      }
    }
  }

  return (
    <div className={styles.filterPriceWrapper}>
      $
      <input
        type="text"
        className={`${styles.filterPriceInput}`}
        value={props.value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default FilterPriceInput
