import { useCallback, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import Button from 'src/components/Button/Button'

const MobileMenu = ({
  children,
  direction,
  isOpen,
  triggerContents,
  triggerProps,
  disableAutoClose,
}) => {
  const [showMenu, setShowMenu] = useState(isOpen)
  const childrenContainerRef = useRef(null)

  const handleChildrenClick = useCallback(() => {
    if (showMenu && !disableAutoClose) {
      childrenContainerRef.current.addEventListener('click', (e) => {
        const interactiveElements = ['a', 'button']
        if (interactiveElements.includes(e.target.tagName.toLowerCase())) {
          setShowMenu(false)
        }
      })
    }
  }, [showMenu, disableAutoClose])

  useEffect(() => {
    handleChildrenClick()
  }, [handleChildrenClick])

  if (!showMenu) {
    return (
      <Button onClick={() => setShowMenu(true)} {...triggerProps}>
        {triggerContents}
      </Button>
    )
  }

  return createPortal(
    <div className="mobile-menu" data-direction={direction}>
      <div className="flex justify-end items-center p-4 w-full">
        <Button onClick={() => setShowMenu(false)}>&times;</Button>
      </div>
      <div className="mt-4 p-4" ref={childrenContainerRef}>
        {children}
      </div>
    </div>,
    document.querySelector('body')
  )
}

MobileMenu.defaultProps = {
  isOpen: false,
  direction: 'rtl',
  disableAutoClose: false,
}

MobileMenu.propTypes = {
  direction: PropTypes.string,
  isOpen: PropTypes.bool,
  triggerContents: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  disableAutoClose: PropTypes.bool,
  triggerProps: PropTypes.object,
}

export default MobileMenu
