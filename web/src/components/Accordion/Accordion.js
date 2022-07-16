import React, { useState } from 'react'

const Accordion = ({ unexpandedContent, content }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        {unexpandedContent}
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  )
}

export default Accordion
