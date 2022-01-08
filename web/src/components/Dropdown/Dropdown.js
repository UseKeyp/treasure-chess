import { useState } from 'react'
import styles from './Dropdown.module.scss'
import { ReactComponent as Carat } from '../../assets/icons/carat.svg'

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  let options = props.options

  const toggleOpen = () => {
    setIsOpen((v) => !v)
  }

  const handleSelection = (option) => {
    props.queryFilter === option
      ? props.queryFilterFunction()
      : props.queryFilterFunction(option)
    setIsOpen(false)
  }

  const handleKeyDown = (e, option, index) => {
    // jsx ally yelled at me to implement keyboard navigation
    let elements = document.querySelectorAll(
      `div[name="${props.category}--${styles.dropdownObject}"]`
    )
    if (e.key === 'Enter') {
      handleSelection(props.category === 'Time' ? option.label : option)
      toggleOpen()
    }
    if (e.key === 'ArrowRight') {
      handleSelection(props.category === 'Time' ? option.label : option)
    }
    if (e.key === 'ArrowUp' && index > 0) {
      let nextElement = elements[index - 1]
      nextElement.focus()
    }
    if (e.key === 'ArrowUp' && index === 0) {
      document
        .querySelectorAll(
          `div[name="${props.category}--${styles.dropdownLabel}"]`
        )[0]
        .focus()
    }
    if (e.key === 'ArrowDown' && index < options.length - 1) {
      let nextElement = elements[index + 1]
      nextElement.focus()
    }
  }

  const dropdownElementName = `${props.category}--${styles.dropdownObject}`
  const dropdownSelectorName = `${props.category}--${styles.dropdownLabel}`

  return (
    <div className={styles.dropdownWrapper}>
      <h4>{props.category}</h4>
      <div onMouseLeave={() => setIsOpen(false)} className={styles.dropdown}>
        <div
          className={styles.dropdownLabel}
          onClick={() => toggleOpen()}
          name={dropdownSelectorName}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'ArrowRight') {
              toggleOpen()
            }
            if (e.key === 'ArrowDown' && isOpen === true) {
              let nextElement = document.querySelectorAll(
                `[name="${dropdownElementName}"]`
              )[0]
              nextElement.focus()
            }
          }}
          role={'button'}
          tabIndex={0}
        >
          {typeof props.queryFilter !== 'undefined' ? (
            <>
              <span>{props.queryFilter}</span> <Carat />
            </>
          ) : (
            <>
              <span>{props?.default ? props.default : 'Select'}</span> <Carat />
            </>
          )}
        </div>
        {isOpen && typeof options !== 'undefined' ? (
          <div className={styles.optionContainerWrap}>
            <div className={styles.optionContainer}>
              {options.map((option, index) => {
                return (
                  <div
                    key={index}
                    className={styles.dropdownObject}
                    role={'button'}
                    tabIndex={0}
                    name={`${dropdownElementName}`}
                    onClick={() => {
                      handleSelection(
                        props.category === 'Time' ? option.name : option
                      )
                    }}
                    onKeyDown={(e) => handleKeyDown(e, option, index)}
                  >
                    {props.category === 'Time' ? option.name : option}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Dropdown
