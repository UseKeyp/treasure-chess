import { useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import Button from 'src/components/Button/Button'

const MobileMenu = ({ children, direction, isOpen, trigger }) => {
  const [showMenu, setShowMenu] = useState(isOpen)

  if (!showMenu) {
    return <Button onClick={() => setShowMenu(true)}>{trigger}</Button>
  }

  return createPortal(
    <div className="mobile-menu" data-direction={direction}>
      <div className="flex justify-end items-center p-4 w-full">
        <Button onClick={() => setShowMenu(false)}>&times;</Button>
      </div>
      <div className="mt-4 p-4">{children}</div>
    </div>,
    document.querySelector('body')
  )
}

MobileMenu.defaultProps = {
  isOpen: false,
  direction: 'rtl',
}

MobileMenu.propTypes = {
  direction: PropTypes.string,
  isOpen: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
}

export default MobileMenu
