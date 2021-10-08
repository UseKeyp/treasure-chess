import styles from './FilterTextInput.module.scss';

const FilterTextInput = () => {
  return (
    <div className={styles.filterTextWrapper}>
    $<input type='number' step="0.1" min="0.1" max="9999" className={`number ${styles.filterTextInput}`}/>
    </div>
  )
}

export default FilterTextInput
