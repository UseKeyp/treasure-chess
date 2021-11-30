import { useLazyQuery } from '@apollo/client'

import GamesCell from 'src/components/Game/GamesCell'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'

import { GamesContext } from 'src/providers/context/GamesContext'

import {
  CHECKOUT,
  MINTING,
  COMPLETE,
  FAILED,
} from 'src/components/Game/constants'

const MINT_PURCHASES = gql`
  query mintPurchases {
    mintPurchases {
      id
      createdAt
      updatedAt
      treasure {
        id
      }
      orderId
      reservation
      orderStatus
      gameId
      gameEndTime
      title
      txHash
      txStatus
    }
  }
`

const GameExplorer = () => {
  const [context] = React.useContext(GamesContext)
  const { activeGame, mintingStatus } = context
  const [filter, setFilter] = React.useState()

  const [
    stopPolling,
    startPolling,
    { data: mintPurchasesData, error: mintPurchasesError },
  ] = useLazyQuery(MINT_PURCHASES, { pollInterval: 1000 })

  const isMinting = [CHECKOUT, MINTING].includes(mintingStatus)

  const consumeMintPurchasesData = async () => {
    const { mintPurchases } = mintPurchasesData
    if (!mintPurchases) return
    console.log('polled')
    let mintPurchase
    if (!mintingStatus) {
      // User may have refreshed the page, get the most recent mintPurchase
      mintPurchase = mintPurchases[0]
      if (
        mintPurchase.orderStatus !== COMPLETE ||
        [COMPLETE, FAILED].includes(mintPurchase.txStatus)
      )
        return stopPolling() // Stop if nothing is currently being minted
      setContext({ ...context, mintingStatus: MINTING })
      // TODO: Update activeGame??
    } else {
      // User-initiated the minting, so we must use the activeGame
      mintPurchase = mintPurchases.find(
        (purchase) =>
          purchase.gameEndTime === activeGame.endTime &&
          purchase.gameId === activeGame.id
      )
    }
    if (!mintPurchase) return
    if (mintPurchase.orderStatus !== COMPLETE) return

    stopPolling()
    if (mintingStatus === CHECKOUT) {
      // For Wyre orders, update mintStatus if order is complete
      setContext({ ...context, mintStatus: MINTING })
    }

    // Show link to transaction on block explorer
    // TODO: on success update card to show full details?
    // setContext({ ...context, mintingStatus: SUCCESS })
    // TODO: Add state for mint purchase polling?
  }

  const onChangeFilter = (newFilter) => {
    // Prevent change during mint
    if (isMinting) return
    const filterParams = new URLSearchParams(newFilter)
    filterParams.sort()
    setFilter(filterParams.toString())
  }

  React.useEffect(() => {
    if (!mintPurchasesData) return
    consumeMintPurchasesData()
  }, [mintPurchasesData])

  React.useEffect(() => {
    if (![CHECKOUT, MINTING].includes(mintingStatus)) return
    startPolling()
  }, [mintingStatus])

  React.useEffect(() => {
    // Always run at least once, in case user re-freshes the page
    startPolling()
  }, [])

  return (
    <div className="grid grid-rows-1">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div style={{ width: 330 }}>
          <FilterItems headline="Filter Games" onChange={onChangeFilter} />
        </div>
        <GamesCell filter={filter} />
        <GameCard game={activeGame} isMinting={isMinting} />
      </div>
    </div>
  )
}

export default GameExplorer
