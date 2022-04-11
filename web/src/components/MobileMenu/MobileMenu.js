import { useCallback, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'

const MobileMenu = ({
  children,
  direction,
  isOpen,
  triggerContents,
  triggerProps,
  disableAutoClose,
  title,
  setCollapseTreasures,
}) => {
  const [showMenu, setShowMenu] = useState(isOpen)
  const childrenContainerRef = useRef(null)

  const handleShowMenu = () => {
    setCollapseTreasures(true)
    setShowMenu(true)
  }

  const handleCloseMenu = () => {
    setCollapseTreasures(false)
    setShowMenu(false)
  }
  const handleCloseMenuCallback = useCallback(handleCloseMenu, [
    setCollapseTreasures,
  ])

  const handleChildrenClick = useCallback(() => {
    if (showMenu && !disableAutoClose) {
      childrenContainerRef.current.addEventListener('click', (e) => {
        const interactiveElements = ['a', 'button']
        if (interactiveElements.includes(e.target.tagName.toLowerCase())) {
          setTimeout(handleCloseMenuCallback, 250)
        }
      })
    }
  }, [handleCloseMenuCallback, disableAutoClose, showMenu])

  useEffect(() => {
    handleChildrenClick()
  }, [handleChildrenClick])

  if (!showMenu) {
    return (
      <Button onClick={handleShowMenu} {...triggerProps}>
        {triggerContents}
      </Button>
    )
  }

  return createPortal(
    <div className="mobile-menu overflow-hidden" data-direction={direction}>
      <div
        className={`flex justify-${
          title ? 'between' : 'end'
        } items-center p-4 w-full`}
      >
        {title ? <div className="mobile-menu--title">{title}</div> : null}
        <Button onClick={handleCloseMenu} className="mr-2">
          <Icon name="close_x" />
        </Button>
      </div>
      <div className="px-4" ref={childrenContainerRef}>
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
  title: PropTypes.string,
  setCollapseTreasures: () => {},
}

export default MobileMenu
