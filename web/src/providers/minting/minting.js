import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useWallet } from 'src/providers/wallet'
import { useToast } from 'src/providers/toast'
import { useModal } from 'src/hooks/useModal'
import { MintingToast } from './toasts'
import { CancelModal, SuccessModal } from './modals'

import {
  PENDING_MINT_PURCHASES_QUERY,
  MINT_CHECKOUT_URL_QUERY,
  MINT_WITH_CREDIT_MUTATION,
} from './graphql'

import {
  ADDING_FUNDS,
  MINTING,
  SUCCESS,
  FAILED,
  SUBMITTED,
  COMPLETE,
  RESERVATION,
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
    shouldPoll: false,
    pendingMintPurchases: [],
    successfulMintPurchase: null,
  })

  const toastPurchase = (purchase) => {
    // TODO: Add more data to toasts (links, etc.)
    if (purchase.orderStatus === RESERVATION)
      toast.loading('Waiting for Wyre...', { id: purchase.id })
    if (purchase.txStatus === SUBMITTED)
      toast.loading(<MintingToast mintingPurchase={purchase} />, {
        id: purchase.id,
      })
    if (purchase.txStatus === COMPLETE)
      toast.success('Success!', { id: purchase.id })
    if (purchase.txStatus === FAILED)
      toast.error('Minting Failed!', { id: purchase.id })
  }

  const {
    data: { pendingMintPurchases: pendingMintPurchasesPoll } = {},
    // previousData: { previousMintPurchasesPoll } = {},
  } = useQuery(PENDING_MINT_PURCHASES_QUERY, {
    pollInterval: 5000,
    skip: !state.shouldPoll,
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
    const { data: { pendingMintPurchases } = {} } =
      await pendingMintPurchasesLazyQuery()
    if (!pendingMintPurchases) return
    pendingMintPurchases.map((purchase) => toastPurchase(purchase))
    setState({ ...state, pendingMintPurchases, shouldPoll: true })
    toast.loading(
      <MintingToast
        mintPurchase={{
          txHash:
            '0xc530723d9144d9c53dbeb7ec39c343ed1d6673e08bf9fbc5db0f014b2b5b5932',
        }}
      />
    )
  }
  const consumePendingMintPurchasesPoll = async () => {
    const last = state.pendingMintPurchases
    const current = pendingMintPurchasesPoll
    if (current === last) return
    if (current && !current.length)
      return setState({ ...state, pendingMintPurchases: [], shouldPoll: false })

    setState({ ...state, pendingMintPurchases: current })
    current?.map((purchase) => {
      // Newly added mintPurchase
      console.log(last[0])
      console.log(current[0])
      if (!last.map((item) => item.id).includes(purchase.id))
        return toastPurchase(purchase)
      const lastPurchase = last.find((item) => item.id === purchase.id)
      if (lastPurchase.txStatus !== purchase.txStatus) {
        toastPurchase(purchase)
        if (purchase.txStatus === COMPLETE) {
          setState({
            ...state,
            successfulMintPurchase: purchase,
            shouldPoll: false,
            mintStatus: SUCCESS,
          })
        }
      }
    })
  }

  const mint = async ({ title, gameId, endTime }) => {
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
    // TODO:  Delete mintPurchaseMutation
    setState({ ...state, mintStatus: null, mintError: null })
  }

  React.useEffect(() => {
    consumePendingMintPurchasesPoll()
    /* eslint-disable react-hooks/exhaustive-deps*/
  }, [pendingMintPurchasesPoll])

  React.useEffect(() => {
    isAuthenticated && onPageLoad()
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
      {state.successfulMintPurchase ? (
        <SuccessModal
          onSubmit={() => setState({ ...state, successfulMintPurchase: null })}
          mintPurchase={state.successfulMintPurchase}
          isVisible={true}
          toggleModal={() => {}}
        />
      ) : null}
      {children}
    </MintingContext.Provider>
  )
}

const useMinting = () => React.useContext(MintingContext)

export { MintingProvider, useMinting }
