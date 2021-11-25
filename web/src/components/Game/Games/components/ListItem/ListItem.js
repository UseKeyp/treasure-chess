import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { P } from 'src/components/Typography'
import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'

import { formatDate } from 'src/utils/helpers'

import { CHECKOUT, MINTING } from 'src/components/Game/Games/constants'

const mainColor = '#C4C4C4'

const ListItem = ({
  game,
  outcome,
  onClick,
  onChangeTitle,
  onSubmit,
  isExpanded,
  mintingStatus,
}) => {
  const [inputValue, setInputValue] = useState('')

  const {
    whiteUsername: player1,
    blackUsername: player2,
    endTime,
    id,
    tokenId,
    title,
  } = game
  const date = formatDate(endTime)

  const isMinting = mintingStatus === CHECKOUT || mintingStatus === MINTING

  const handleSubmit = (e) => {
    if (isMinting) return
    e.stopPropagation()
    if (!inputValue) return
    onSubmit(id, inputValue)
  }
  const handleChange = (e) => {
    if (isMinting) return
    onChangeTitle(e.target.value)
    setInputValue(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e)
  }
  const handleSelectRow = () => {
    if (isMinting) return
    onClick(id)
  }

  React.useEffect(() => {
    setInputValue('')
  }, [isExpanded])

  return (
    <div
      className="games-history-list__item"
      role="button"
      onClick={handleSelectRow}
      tabIndex={0}
      onKeyDown={() => {}}
    >
      {title && (
        <P pb={8} fontWeight={700} fontSize={16}>
          {title}
        </P>
      )}
      <div className="flex justify-between">
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
        <P fontSize={12} color={mainColor} fontWeight={600}>
          {outcome}
        </P>
        <div className="flex flex-col text-right">
          <P pb={3} fontSize={12} color={mainColor} fontWeight={600}>
            {date}
          </P>
          {tokenId && (
            <P fontSize={12} color={'#FFBB0D'} fontWeight={400}>
              Minted
            </P>
          )}
        </div>
      </div>
      {isExpanded && !tokenId && (
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
