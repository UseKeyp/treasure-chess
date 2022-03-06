import React from 'react'

import { P } from 'src/components/Typography'
import Icon from 'src/components/Icon/Icon'
import MintForm from 'src/components/Game/Games/components/MintForm'
import LoadingDots from 'src/components/LoadingDots'
import { useMinting } from 'src/providers/minting'

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
  const { white: player1, black: player2, endTime, id, tokenId, title } = game
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
