import {useState} from 'react'
import styles from './Dropdown.module.scss'
import {ReactComponent as Carat} from '../../assets/icons/carat.svg'

const Dropdown = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdownWrapper}>
      <h4>{props.category}</h4>
      <div className={styles.dropdown}>
        <div className={styles.dropdownLabel}><span>Select</span> <Carat /></div>
      </div>
    </div>
  )
}

export default Dropdown
