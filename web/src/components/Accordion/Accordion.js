import React, { useState } from 'react'

const Accordion = ({ unexpandedContent, children, toggle }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="accordion-item">
      <div className="accordion-title">
        <div className="flex justify-between">
          {unexpandedContent}
          <button onClick={() => setIsActive(!isActive)}>{toggle}</button>
        </div>
      </div>
      {isActive && <div className="accordion-content">{children}</div>}
    </div>
  )
}

export default Accordion
