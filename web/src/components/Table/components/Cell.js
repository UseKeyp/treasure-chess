import React from 'react'

const Cell = ({ children, style }) => {
  return (
    <div
      className="flex items-center justify-start p-2 m-2"
      style={style}
      role="cell"
    >
      {children}
    </div>
  )
}

export default Cell
