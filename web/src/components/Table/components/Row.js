import React from 'react'

const Row = ({ children, onClick, className, index, isSelected, length }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onClick()
  }

  const showLine = index && length !== index && length !== 1

  return (
    <div
      className={`table-component-row flex-col p-2 ${
        className ? className : ''
      }`}
      role={'row'}
      aria-rowindex={index ? index : undefined}
    >
      <div
        className={`flex table-component-row-inner ${
          isSelected ? 'row-active' : ''
        }`}
        role={'presentation'}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
      {showLine && <hr className="table-line" />}
    </div>
  )
}

export default Row
