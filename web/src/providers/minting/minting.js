import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

import { useWallet } from 'src/providers/wallet'

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
  const { mintStatus, shouldPoll } = state

  const { mintCreditBalance } = useWallet()
  const { isAuthenticated } = useAuth()

  const { data: { mintPurchases } = {} } = useQuery(
    PENDING_MINT_PURCHASES_QUERY,
    {
      pollInterval: 10000,
      skip: !shouldPoll || !isAuthenticated,
      fetchPolicy: 'network-only',
    }
  )

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
  ] = useMutation({
    mutation: MINT_WITH_CREDIT_MUTATION,
  })

  const consumeMintPurchasesData = () => {
    // Loading the page fresh should do an initial check

    // Stop polling if there are no mintpurchases
    console.log(mintPurchases)
    if (!mintPurchases) return setState({ ...state, shouldPoll: false })

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

  const isMinting = [ADDING_FUNDS, MINTING].includes(mintStatus)

  React.useEffect(() => {
    consumeMintPurchasesData()
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [mintPurchases])

  const mint = async ({ title, id, endTime }) => {
    // Check balance and mintCredits
    if (mintCreditBalance < 1) {
      mintCheckoutUrlLazyQuery()
      setState({ ...state, mintStatus: ADDING_FUNDS, shouldPoll: true })
    } else {
      await mintWithCreditMutation({ title, id, endTime })
      console.log(mintWithCreditMutationData)
      console.log(mintWithCreditMutationError)
      setState({ ...state, mintStatus: MINTING, shouldPoll: true })
    }
  }

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
