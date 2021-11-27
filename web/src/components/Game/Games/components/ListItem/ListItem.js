import React from 'react'

import { P } from 'src/components/Typography'
import Icon from 'src/components/Icon/Icon'
import MintForm from 'src/components/Game/Games/components/MintForm'
import LoadingDots from 'src/components/LoadingDots'

import { formatDate } from 'src/utils/helpers'

import { CHECKOUT, MINTING, SUCCESS } from 'src/components/Game/Games/constants'

const mainColor = '#C4C4C4'

const ListItem = ({
  game,
  outcome,
  onClick,
  onReset,
  onChangeTitle,
  onSubmit,
  isExpanded,
  mintingStatus,
}) => {
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

  const handleSubmit = (title) => {
    if (isMinting) return
    onSubmit(title)
  }

  const handleSelectRow = () => {
    if (isMinting) return
    onClick(id)
  }

  const bottomHalf = () => {
    if (!isExpanded) return <></>
    if (mintingStatus === CHECKOUT)
      return (
        <div className="games-history-list__status">
          Complete checkout in the Wyre popup.
          <button
            className="games-history-list__reset-button"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      )
    if (mintingStatus === MINTING)
      return (
        <div className="games-history-list__status">
          Your Treasure is being minted.
          <div className="games-history-list__loading-status">
            This can take up to 3 minutes.
            <LoadingDots className="ml-2" />
          </div>
        </div>
      )
    if (mintingStatus === SUCCESS)
      return (
        <div className="games-history-list__status">
          Your Treasure was minted.
        </div>
      )
    if (!tokenId && !isMinting)
      return (
        <MintForm
          onSubmit={handleSubmit}
          onChangeTitle={onChangeTitle}
          isMinting={isMinting}
        />
      )
  }

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
      <div className="games-history-list__top-half">
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
      {bottomHalf()}
    </div>
  )
}

export default ListItem
