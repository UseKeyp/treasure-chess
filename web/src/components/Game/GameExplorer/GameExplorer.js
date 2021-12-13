import { useQuery } from '@apollo/client'

import GamesCell from 'src/components/Game/GamesCell'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'

import { GamesContext } from 'src/providers/context/GamesContext'

import {
  CHECKOUT,
  MINTING,
  COMPLETE,
  FAILED,
  SUCCESS,
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
  const [context, setContext] = React.useContext(GamesContext)
  const { activeGame, mintingStatus } = context
  const [filter, setFilter] = React.useState()
  const [isPolling, setIsPolling] = React.useState()

  const { data: mintPurchasesData } = useQuery(MINT_PURCHASES, {
    pollInterval: 1000,
    skip: !isPolling,
    fetchPolicy: 'network-only',
  })

  const isMinting = [CHECKOUT, MINTING].includes(mintingStatus)

  const consumeMintPurchasesData = async () => {
    const { mintPurchases } = mintPurchasesData
    if (!mintPurchases) return
    const mintPurchase = mintPurchases.find(
      (purchase) =>
        purchase.gameEndTime === activeGame?.endTime &&
        purchase.gameId === activeGame?.id
    )
    if (!mintPurchase) return
    if (mintPurchase.orderStatus !== COMPLETE) return
    if (mintingStatus === CHECKOUT)
      // For Wyre orders, update mintStatus if order is complete
      setContext({ ...context, mintStatus: MINTING })

    if ([COMPLETE, FAILED].includes(mintPurchase.txStatus)) {
      setIsPolling(false)
      setContext({
        ...context,
        mintingStatus: SUCCESS,
        activeGame: mintPurchase.treasure,
      })
    }
  }

  const onChangeFilter = (newFilter) => {
    // Prevent change during mint
    if (isMinting) return
    const filterParams = new URLSearchParams(newFilter)
    filterParams.sort()
    setFilter(filterParams.toString())
  }

  React.useEffect(() => {
    if (!isMinting || !mintPurchasesData) return
    consumeMintPurchasesData()
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [mintPurchasesData])

  React.useEffect(() => {
    if (!isMinting) return
    setIsPolling(true)
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [mintingStatus])

  return (
    <div className="grid grid-rows-1">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div style={{ width: 330 }}>
          <FilterItems headline="Filter Games" onChange={onChangeFilter} />
        </div>
        <GamesCell filter={filter} />
        <GameCard game={activeGame} isMinting={mintingStatus === MINTING} />
      </div>
    </div>
  )
}

export default GameExplorer
