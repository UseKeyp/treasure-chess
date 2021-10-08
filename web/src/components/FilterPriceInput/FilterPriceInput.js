import { useState } from 'react'
import styles from './FilterPriceInput.module.scss'

const FilterPriceInput = (props) => {
  const moneyRegex = /\d+/
  const [amount, setAmount] = useState('')

  const handleChange = (event) => {
    // allows form clearing
    if (event.target.value === '') {
      setAmount('')
    }
    // limit inputs
    if (moneyRegex.test(event.target.value)) {
      if (event.target.value.length <= 6) {
        setAmount(event.target.value)
      }
      if (event.target.value.length > 6) {
        setAmount((v) => v)
      }
    }
    // no non-number inputs
    if (!moneyRegex.test(event.target.value)) {
      setAmount((v) => v)
    }
  }

  return (
    <div className={styles.filterPriceWrapper}>
      $
      <input
        type="text"
        className={`${styles.filterPriceInput}`}
        value={amount}
        onChange={handleChange}
      />
    </div>
  )
}

export default FilterPriceInput
