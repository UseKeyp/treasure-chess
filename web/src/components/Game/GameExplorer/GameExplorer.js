import { useLazyQuery } from '@apollo/client'

import GamesCell from 'src/components/Game/GamesCell'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'

import { GamesContext } from 'src/providers/context/GamesContext'

import { CHECKOUT, MINTING } from 'src/components/Game/Games/constants'

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
    mintPurchases,
    { data: mintPurchasesData, error: mintPurchasesError },
  ] = useLazyQuery(MINT_PURCHASES, { pollInterval: 1000 })

  const consumeMintPurchasesData = async () => {
    console.log(mintPurchasesData)
    // const { mintPurchases } = mintPurchasesData
    // Show link to transaction on block explorer
    // setContext({ ...context, mintingStatus: SUCCESS })
    // TODO: on success update card to show full details?
    // TODO: Add state for mint purchase polling?
  }

  const onChangeFilter = (newFilter) => {
    // Prevent change during mint
    if (mintingStatus === CHECKOUT || mintingStatus === MINTING) return
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
    mintPurchases()
  }, [mintingStatus])

  return (
    <div className="grid grid-rows-1">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div style={{ width: 330 }}>
          <FilterItems headline="Filter Games" onChange={onChangeFilter} />
        </div>
        <GamesCell filter={filter} />
        <GameCard game={activeGame} />
      </div>
    </div>
  )
}

export default GameExplorer
