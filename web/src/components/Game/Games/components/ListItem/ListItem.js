import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { P } from 'src/components/Typography'
import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'

const mainColor = '#C4C4C4'

const ListItem = ({
  player1,
  player2,
  date,
  id,
  onSubmit,
  outcome,
  onChangeTitle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.stopPropagation()
    if (!inputValue) return
    onSubmit(id, inputValue)
  }
  const handleChange = (e) => {
    onChangeTitle(e.target.value)
    setInputValue(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div
      className="games-history-list__item"
      role="button"
      onClick={() => setIsExpanded(!isExpanded)}
      tabIndex={0}
      onKeyDown={() => {}}
    >
      <div className="flex justify-between mb-4">
        <div className="games-history-list__players">
          <div className="flex items-center pb-1">
            <div className="games-history-list__color-box" />
            <P pl={7} pr={7} fontWeight={600} color={mainColor}>
              {player1}
            </P>
            <Icon name="crown" color={mainColor} />
          </div>
          <div className="flex items-center">
            <div className="games-history-list__color-box games-history-list__color-box--black" />
            <P pl={7} fontWeight={600} color={mainColor}>
              {player2}
            </P>
          </div>
        </div>
        <P pr="1rem" fontSize={12} color={mainColor} fontWeight={600}>
          {outcome}
        </P>
        <P pr="1rem" fontSize={12} color={mainColor} fontWeight={600}>
          {date}
        </P>
      </div>
      {isExpanded && (
        <div className="games-history-list__mint-section flex">
          <input
            type="text"
            value={inputValue}
            placeholder="Game Title"
            className="games-history-list__input"
            onClick={(e) => e.stopPropagation()}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Button variant="green" onClick={handleSubmit}>
            Mint
          </Button>
        </div>
      )}
    </div>
  )
}

ListItem.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  outcome: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
}

export default ListItem
