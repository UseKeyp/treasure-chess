import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useWallet } from 'src/providers/wallet'
import { useToast } from 'src/providers/toast'
import { useModal } from 'src/hooks/useModal'

import { CancelModal } from './modals'

import {
  PENDING_MINT_PURCHASES_QUERY,
  MINT_CHECKOUT_URL_QUERY,
  MINT_WITH_CREDIT_MUTATION,
} from './graphql'

import {
  ADDING_FUNDS,
  MINTING,
  _SUCCESS,
  FAILED,
} from 'src/providers/minting/constants'

const MintingContext = React.createContext({
  mintStatus: null,
  mintError: null,
  pendingMintPurchases: [],
})

const MintingProvider = ({ children }) => {
  const { mintCreditBalance } = useWallet()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const { isVisible: isVisibleModalCancel, toggleModal: toggleModalCancel } =
    useModal()

  const [state, setState] = React.useState({
    mintStatus: null,
    shouldPoll: true,
    pendingMintPurchases: [],
  })

  const {
    data: { pendingMintPurchasesPoll } = {},
    // previousData: { previousMintPurchasesPoll } = {},
  } = useQuery(PENDING_MINT_PURCHASES_QUERY, {
    pollInterval: 10000,
    skip: !state.shouldPoll || !isAuthenticated,
    fetchPolicy: 'network-only',
  })

  const [pendingMintPurchasesLazyQuery] = useLazyQuery(
    PENDING_MINT_PURCHASES_QUERY
  )

  const [mintCheckoutUrlLazyQuery] = useLazyQuery(MINT_CHECKOUT_URL_QUERY)

  const [
    mintWithCreditMutation,
    { data: mintWithCreditMutationData, error: mintWithCreditMutationError },
  ] = useMutation(MINT_WITH_CREDIT_MUTATION)

  const onPageLoad = async () => {
    const { data: pendingMintPurchases } = await pendingMintPurchasesLazyQuery()
    setState({ ...state, pendingMintPurchases })
  }

  const consumePendingMintPurchasesPoll = async () => {
    console.log(state.pendingMintPurchases)
    console.log(pendingMintPurchasesPoll)
    setState({ ...state, pendingMintPurchases: pendingMintPurchasesPoll })
    // TODO:  Turn off polling after initial load, but may cause problems
    // if (pendingMintPurchases === [])
    //   return setState({ ...state, shouldPoll: false })

    // We can simplify this by limiting the user to only create one purchase at a time?

    // Only show UI prompts when data changes
    if (state.pendingMintPurchases === pendingMintPurchasesPoll) return
    // state.pendingMintPurchases?.map((previousPurchase) => {
    //   // Compare orderStatus change. if orderStatus changed from RESERVATION to COMPLETE
    //   // Remove wyre checkout toast, show Wyre checkout success
    //   // If txStatus changed from UNSUBMITTED to SUBMITTED
    //   // Show transaction submitted toast with link to polygonscan
    //   // If txStatus changed from SUBMITTED to COMPLETE
    //   // TODO: txStatus COMPLETE currently isn't returned by the query
    //   // How should we show this?
    // })

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

  const mint = async ({ title, gameId, endTime }) => {
    // Check balance and mintCredits

    // log mint the
    if (mintCreditBalance < 1) {
      const { data: { mintCheckoutUrl } = {}, error } =
        await mintCheckoutUrlLazyQuery({
          variables: { title, gameId, endTime },
        })
      if (error)
        return setState({
          ...state,
          mintStatus: FAILED,
          mintError: error,
        })
      setState({ ...state, mintStatus: ADDING_FUNDS, shouldPoll: true })
      window.open(
        mintCheckoutUrl,
        'Treasure Chess Checkout',
        'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
      )
    } else {
      await mintWithCreditMutation({ variables: { title, gameId, endTime } })
      setState({ ...state, mintStatus: MINTING, shouldPoll: true })
    }
  }

  const cancelMint = ({ gameId, endTime }) => toggleModalCancel()
  const onConfirmCancel = () => {
    toggleModalCancel()
    setState({ ...state, mintStatus: null, mintError: null })
  }

  React.useEffect(() => {
    consumePendingMintPurchasesPoll()
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [pendingMintPurchasesPoll])

  React.useEffect(() => {
    if (!isAuthenticated) return
    onPageLoad()
  }, [isAuthenticated])

  return (
    <MintingContext.Provider
      value={{
        mint,
        cancelMint,
        mintStatus: state.mintStatus,
        mintError: state.mintError,
      }}
    >
      <CancelModal
        onSubmit={onConfirmCancel}
        isVisible={isVisibleModalCancel}
        toggleModal={toggleModalCancel}
      />
      {children}
    </MintingContext.Provider>
  )
}

const useMinting = () => React.useContext(MintingContext)

export { MintingProvider, useMinting }
