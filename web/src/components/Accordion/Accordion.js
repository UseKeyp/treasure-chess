import React, { useState } from 'react'

const Accordion = ({ unexpandedContent, content, clickTrigger }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="accordion-item">
      <div className="accordion-title">
        <div className="flex justify-between">
          {unexpandedContent}
          <button onClick={() => setIsActive(!isActive)}>{clickTrigger}</button>
        </div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  )
}

export default Accordion
