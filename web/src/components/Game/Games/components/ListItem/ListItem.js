import React from 'react'

import { P } from 'src/components/Typography'
import Icon from 'src/components/Icon/Icon'
import MintForm from 'src/components/Game/Games/components/MintForm'
import LoadingDots from 'src/components/LoadingDots'
import { useMinting } from 'src/providers/minting'
import { getRarityColor } from '@treasure-chess/treasure-html'
import { formatDate } from 'src/utils/helpers'

import {
  MINT_STATUS_ADDING_FUNDS,
  MINT_STATUS_MINTING,
  MINT_STATUS_SUCCESS,
} from 'src/providers/minting/constants'

const mainColor = '#C4C4C4'

const ListItem = ({
  game,
  outcome,
  onClick,
  onReset,
  onChangeTitle,
  onSubmit,
  isExpanded,
}) => {
  const {
    white: player1,
    black: player2,
    endTime,
    id,
    tokenId,
    title,
    achievementScore,
  } = game
  const date = formatDate(endTime)
  const { clearMintError, mintStatus, mintError, mintLoading } = useMinting()

  const isMinting =
    mintStatus === MINT_STATUS_ADDING_FUNDS ||
    mintStatus === MINT_STATUS_MINTING

  const handleSubmit = (title) => {
    if (isMinting) return
    onSubmit(title)
  }

  const handleSelectRow = () => {
    if (isMinting) return
    clearMintError()
    onClick(id)
  }

  const bottomHalf = () => {
    if (!isExpanded) return <></>
    if (mintStatus === MINT_STATUS_ADDING_FUNDS)
      return (
        <div className="games-history-list__status">
          Continue via Wyre popup.
          <button
            className="games-history-list__reset-button"
            onClick={onReset}
          >
            Cancel
          </button>
        </div>
      )
    if (mintStatus === MINT_STATUS_MINTING)
      return (
        <div className="games-history-list__status flex">
          <LoadingDots />
          <div className="ml-4">Minting (~1 minute)</div>
        </div>
      )
    if (mintStatus === MINT_STATUS_SUCCESS)
      return (
        <div className="games-history-list__status">
          Your Treasure was minted.
        </div>
      )
    if (!tokenId && !isMinting)
      return (
        <MintForm
          errorText={mintError}
          onSubmit={handleSubmit}
          onChangeTitle={onChangeTitle}
          isMinting={isMinting}
          mintLoading={mintLoading}
        />
      )
  }
  let rarityColor
  if (achievementScore) {
    rarityColor = getRarityColor(achievementScore)
    if (rarityColor === '#8a8886') rarityColor = '#ffffff'
  }
  return (
    <div
      className="games-history-list__item"
      role="button"
      onClick={handleSelectRow}
      tabIndex={0}
      onKeyDown={() => {}}
    >
      {tokenId && (
        <div className="flex space-x-2 pb-3 pt-1 w-full ">
          <Icon name="treasure_chess" color={rarityColor} height="16px" />
          <P fontWeight={700} fontSize={16} color={rarityColor}>
            {title}
          </P>
        </div>
      )}
      <div className="games-history-list__top-half">
        <div className="games-history-list__players w-[60%]">
          <div className="flex items-center pb-1">
            <div className="games-history-list__color-box" />
            <P pl={7} pr={7} fontWeight={600} color={mainColor}>
              {player1.username}
            </P>
            {game.outcome === 'white' && (
              <Icon name="crown" color={mainColor} />
            )}
          </div>
          <div className="flex items-center">
            <div className="games-history-list__color-box games-history-list__color-box--black" />
            <P pl={7} pr={7} fontWeight={600} color={mainColor}>
              {player2.username}
            </P>
            {game.outcome === 'black' && (
              <Icon name="crown" color={mainColor} />
            )}
          </div>
        </div>
        <div className="w-[10%] mx-4">
          <P fontSize={12} color={mainColor} fontWeight={600}>
            {outcome}
          </P>
        </div>
        <div className="flex flex-col text-right w-[30%]">
          <P pb={3} fontSize={12} color={mainColor} fontWeight={600}>
            {date}
          </P>
        </div>
      </div>
      {bottomHalf()}
    </div>
  )
}

export default ListItem
