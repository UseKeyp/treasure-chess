const MintingContext = React.createContext()
import { useLazyQuery, useQuery } from '@apollo/client'

import { queryWyreCheckoutUrl } from './queries'

import {
  ADDING_FUNDS,
  MINTING,
  _SUCCESS,
  COMPLETE,
  FAILED,
} from 'src/providers/minting/constants'

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

const initialState = { mintingStatus: null, isPolling: false }
const MintingProvider = ({ children }) => {
  const [state, setState] = React.useState(initialState)

  const { mintingStatus, isPolling } = state

  const { data: mintPurchasesData } = useQuery(MINT_PURCHASES, {
    pollInterval: 2000,
    skip: !isPolling,
    fetchPolicy: 'network-only',
  })

  const consumeMintPurchasesData = async () => {
    // If mintPurchase is outstanding, then start polling
    const { mintPurchases } = mintPurchasesData
    if (!mintPurchases) return
    const mintPurchase = mintPurchases.find(
      (purchase) =>
        purchase.gameEndTime === activeGame?.endTime &&
        purchase.gameId === activeGame?.id
    )
    if (!mintPurchase) return
    if (mintPurchase.orderStatus !== COMPLETE) return
    if (mintingStatus === ADDING_FUNDS)
      // For Wyre orders, update mintStatus if order is complete
      setContext({ ...context, mintStatus: MINTING })

    if ([COMPLETE, FAILED].includes(mintPurchase.txStatus)) {
      setState({
        ...state,
        mintingStatus: SUCCESS,
        isPolling: false,
      })
    }
  }

  const isMinting = [ADDING_FUNDS, MINTING].includes(mintingStatus)

  React.useEffect(() => {
    if (!isMinting) return
    setIsPolling(true)
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [mintingStatus])

  React.useEffect(() => {
    if (!isMinting || !mintPurchasesData) return
    consumeMintPurchasesData()
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [mintPurchasesData])

  const mint = async ({ title, id, endTime }) => {
    // Check balance and mintCredits
    // If necessary trigger Wyre deposit prompt
    // Execute mint
    // Start polling
  }

  return (
    <MintingContext.Provider
      value={{
        mint,
        mintingStatus,
      }}
    >
      {children}
    </MintingContext.Provider>
  )
}

const useMinting = () => React.useContext(MintingContext)

export { MintingProvider, useMinting }
