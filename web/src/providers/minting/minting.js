const MintingContext = React.createContext()
import { useLazyQuery } from '@apollo/client'

import {
  ADDING_FUNDS,
  MINTING,
  _SUCCESS,
} from 'src/providers/minting/constants'

const MINT_CHECKOUT_URL = gql`
  query mintADDING_FUNDSUrl(
    $gameId: String!
    $endTime: DateTime!
    $title: String!
  ) {
    mintADDING_FUNDSUrl(gameId: $gameId, endTime: $endTime, title: $title)
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

  // Maybe move this to a withdraw/deposit provider?
  // const [addFunds, { error: _addFundsError }] = useLazyQuery(
  //   MINT_CHECKOUT_URL,
  //   {
  //     onCompleted: ({ addFundUrl }) => {
  //       if (addFundUrl.includes('https')) {
  //         setState({ ...state, mintingStatus: ADDING_FUNDS })
  //         window.open(
  //           addFundUrl,
  //           'Treasure Chess ADDING_FUNDS',
  //           'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
  //         )
  //       } else {
  //         setState({ ...state, mintingStatus: MINTING })
  //       }
  //     },
  //   }
  // )

  const mint = async () => {
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

const useMinting = React.useContext(MintingContext)

export { MintingProvider, useMinting }
