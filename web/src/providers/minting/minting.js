import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useWallet } from 'src/providers/wallet'
import { useToast } from 'src/providers/toast'

import {
  PENDING_MINT_PURCHASES_QUERY,
  MINT_CHECKOUT_URL_QUERY,
  MINT_WITH_CREDIT_MUTATION,
} from './graphql'

import {
  ADDING_FUNDS,
  MINTING,
  _SUCCESS,
  COMPLETE,
  FAILED,
} from 'src/providers/minting/constants'

const MintingContext = React.createContext({
  mintStatus: null,
  mintError: null,
})

const MintingProvider = ({ children }) => {
  const [state, setState] = React.useState({
    mintStatus: null,
    shouldPoll: true,
  })

  const { mintCreditBalance } = useWallet()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  const {
    data: { pendingMintPurchases } = {},
    previousData: { previousMintPurchases } = {},
  } = useQuery(PENDING_MINT_PURCHASES_QUERY, {
    pollInterval: 10000,
    skip: !state.shouldPoll || !isAuthenticated,
    fetchPolicy: 'network-only',
  })

  const [mintCheckoutUrlLazyQuery, { error: mintCheckoutUrlError }] =
    useLazyQuery(MINT_CHECKOUT_URL_QUERY, {
      onCompleted: ({ mintCheckoutUrl }) => {
        window.open(
          mintCheckoutUrl,
          'Treasure Chess Checkout',
          'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
        )
      },
    })

  const [
    mintWithCreditMutation,
    { data: mintWithCreditMutationData, error: mintWithCreditMutationError },
  ] = useMutation(MINT_WITH_CREDIT_MUTATION)

  const consumePendingMintPurchases = () => {
    // TODO:  Turn off polling after initial load, but may cause problems
    // if (pendingMintPurchases === [])
    //   return setState({ ...state, shouldPoll: false })

    console.log(pendingMintPurchases)

    // We can simplify this by limiting the user to only create one purchase at a time?

    // Only show UI prompts when data changes
    if (previousMintPurchases === undefined) return
    previousMintPurchases.map((previousPurchase) => {
      // Compare orderStatus change. if orderStatus changed from RESERVATION to COMPLETE
      // Remove wyre checkout toast, show Wyre checkout success
      // If txStatus changed from UNSUBMITTED to SUBMITTED
      // Show transaction submitted toast with link to polygonscan
      // If txStatus changed from SUBMITTED to COMPLETE
      // TODO: txStatus COMPLETE currently isn't returned by the query
      // How should we show this?
    })

    // Wyre orders - waiting on user to send funds
    // Otherwise, minting is underway
    // If mintPurchase is outstanding, then start polling
    // const mintPurchase = mintPurchases.find(
    //   (purchase) =>
    //     purchase.gameEndTime === activeGame?.endTime &&
    //     purchase.gameId === activeGame?.id
    // )
    // if (!mintPurchase) return
    // if (mintPurchase.orderStatus !== COMPLETE) return
    // if (mintStatus === ADDING_FUNDS)
    //   // For Wyre orders, update mintStatus if order is complete
    //   setContext({ ...context, mintStatus: MINTING })
    //
    // if ([COMPLETE, FAILED].includes(mintPurchase.txStatus)) {
    //   setState({
    //     ...state,
    //     mintStatus: SUCCESS,
    //     isPolling: false,
    //   })
    // }
  }

  const isMinting = [ADDING_FUNDS, MINTING].includes(state.mintStatus)

  React.useEffect(() => {
    consumePendingMintPurchases()
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [pendingMintPurchases])

  const mint = async ({ title, gameId, endTime }) => {
    // Check balance and mintCredits
    if (mintCreditBalance < 1) {
      mintCheckoutUrlLazyQuery({ variables: { title, gameId, endTime } })
      setState({ ...state, mintStatus: ADDING_FUNDS, shouldPoll: true })
    } else {
      await mintWithCreditMutation({ variables: { title, gameId, endTime } })
      console.log(mintWithCreditMutationData)
      console.log(mintWithCreditMutationError)
      setState({ ...state, mintStatus: MINTING, shouldPoll: true })
    }
  }
  React.useEffect(() => {
    toast.loading('loading')
    toast.success('succes')
  }, [])
  return (
    <MintingContext.Provider
      value={{
        mint,
        mintStatus: state.mintStatus,
        mintError: mintCheckoutUrlError || mintWithCreditMutationError, // Add other errors here
      }}
    >
      {children}
    </MintingContext.Provider>
  )
}

const useMinting = () => React.useContext(MintingContext)

export { MintingProvider, useMinting }
