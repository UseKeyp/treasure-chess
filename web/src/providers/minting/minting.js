import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useWallet } from 'src/providers/wallet'
import { useToast } from 'src/providers/toast'
import { useModal } from 'src/hooks/useModal'
import { MintingToast } from './toasts'
import { CancelModal, SuccessModal } from './modals'

import {
  PENDING_MINT_PURCHASES_QUERY,
  MINT_CHECKOUT_URL_MUTATION,
  MINT_WITH_CREDIT_MUTATION,
} from './graphql'

import {
  MINT_STATUS_ADDING_FUNDS,
  MINT_STATUS_MINTING,
  MINT_STATUS_SUCCESS,
  WYRE,
  FAILED,
  SUBMITTED,
  COMPLETE,
  RESERVATION,
  PENDING,
} from 'src/providers/minting/constants'

const MintingContext = React.createContext({
  mintStatus: null,
  mintError: null,
  pendingMintPurchases: [],
  mintLoading: false,
})

const MintingProvider = ({ children }) => {
  const { mintCreditBalance } = useWallet()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const { isVisible: isVisibleModalCancel, toggleModal: toggleModalCancel } =
    useModal()
  const { isVisible: isVisibleModalSuccess, toggleModal: toggleModalSuccess } =
    useModal()

  const [state, setState] = React.useState({
    mintStatus: null,
    shouldPoll: false,
    pendingMintPurchases: [],
    successfulMintPurchase: null,
    mintLoading: false,
  })

  const toastPurchase = (purchase) => {
    // TODO: Add more data to toasts (links, etc.)
    if (purchase.orderStatus === RESERVATION)
      return toast.loading('Waiting for Wyre', { id: purchase.id })
    if (purchase.transaction?.status === SUBMITTED)
      return toast.loading(<MintingToast mintPurchase={purchase} />, {
        id: purchase.id,
      })
    if (purchase.status === COMPLETE)
      return toast.success('Success!', { id: purchase.id })
    if (purchase.status === FAILED)
      return toast.error(<MintingToast mintPurchase={purchase} />, {
        id: purchase.id,
      })
    if (purchase.status === PENDING) {
      if (purchase.paymentType === WYRE)
        toast.success('Wyre checkout successful!')
      toast.loading('Preparing to Mint', { id: purchase.id })
    }
  }
  useQuery(PENDING_MINT_PURCHASES_QUERY, {
    pollInterval: 5000,
    skip: !state.shouldPoll,
    fetchPolicy: 'network-only',
    onCompleted: async ({
      pendingMintPurchases: pendingMintPurchasesPoll,
    } = {}) => {
      const last = state.pendingMintPurchases
      const current = pendingMintPurchasesPoll
      if (current === last) return
      if (current && !current.length)
        return setState({
          ...state,
          pendingMintPurchases: [],
          shouldPoll: false,
        })

      setState({ ...state, pendingMintPurchases: current })
      current?.map((purchase) => {
        if (!last.map((item) => item.id).includes(purchase.id))
          return toastPurchase(purchase)
        const lastPurchase = last.find((item) => item.id === purchase.id)
        if (
          lastPurchase.status !== purchase.status ||
          lastPurchase?.tx.id !== purchase?.tx.id
        ) {
          toastPurchase(purchase)
          if (purchase.status === COMPLETE) {
            setState({
              ...state,
              successfulMintPurchase: purchase,
              shouldPoll: false,
              pendingMintPurchases: [],
              mintStatus: MINT_STATUS_SUCCESS,
            })
            toggleModalSuccess()
          } else if (purchase.status === FAILED) {
            setState({
              ...state,
              shouldPoll: false,
              mintStatus: null,
              mintError: 'Mint failed. Please try again.',
            })
          } else if (purchase.orderStatus === COMPLETE) {
            setState({
              ...state,
              mintStatus: MINT_STATUS_MINTING,
              mintError: false,
            })
          }
        }
      })
    },
  })

  const [pendingMintPurchasesLazyQuery] = useLazyQuery(
    PENDING_MINT_PURCHASES_QUERY
  )

  const [mintCheckoutUrlMutation] = useMutation(MINT_CHECKOUT_URL_MUTATION)

  const [mintWithCreditMutation] = useMutation(MINT_WITH_CREDIT_MUTATION)

  const onPageLoad = async () => {
    const { data: { pendingMintPurchases } = {} } =
      await pendingMintPurchasesLazyQuery()
    if (!pendingMintPurchases.length) return
    pendingMintPurchases.map((purchase) => toastPurchase(purchase))
    setState({ ...state, pendingMintPurchases, shouldPoll: true })
  }

  const mint = async ({ title, gameId, endTime }) => {
    await setState({
      ...state,
      mintStatus: MINT_STATUS_MINTING,
      mintLoading: true,
      mintError: false,
    })
    if (mintCreditBalance < 1) {
      try {
        const { data: { mintCheckoutUrl } = {} } =
          await mintCheckoutUrlMutation({
            variables: { title, gameId, endTime },
          })
        setState({
          ...state,
          mintStatus: MINT_STATUS_ADDING_FUNDS,
          shouldPoll: true,
          mintLoading: false,
        })
        window.open(
          mintCheckoutUrl,
          'Treasure Chess Checkout',
          'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
        )
      } catch (error) {
        setState({
          ...state,
          mintStatus: null,
          mintError: error.message,
          mintLoading: false,
        })
      }
    } else {
      try {
        const { data: { mintWithCredit: mintPurchase } = {} } =
          await mintWithCreditMutation({
            variables: { title, gameId, endTime },
          })
        setState({
          ...state,
          pendingMintPurchases: [mintPurchase],
          mintStatus: MINT_STATUS_MINTING,
          shouldPoll: true,
          mintLoading: false,
        })
        toastPurchase(mintPurchase)
      } catch (error) {
        setState({
          ...state,
          mintStatus: null,
          mintError: error.message,
          mintLoading: false,
        })
      }
    }
  }

  const cancelMint = ({ _gameId, _endTime }) => toggleModalCancel()
  const onConfirmCancel = () => {
    toggleModalCancel()
    // TODO:  Delete mintPurchaseMutation
    setState({ ...state, mintStatus: null, mintError: null })
  }

  const cleanupMintSuccess = () =>
    setState({
      ...state,
      mintStatus: null,
      mintError: null,
      successfulMintPurchase: null,
    })
  const clearMintError = () => setState({ ...state, mintError: null })

  React.useEffect(() => {
    isAuthenticated && onPageLoad()
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [isAuthenticated])

  return (
    <MintingContext.Provider
      value={{
        mint,
        cancelMint,
        clearMintError,
        mintStatus: state.mintStatus,
        mintError: state.mintError,
        mintLoading: state.mintLoading,
      }}
    >
      <CancelModal
        onSubmit={onConfirmCancel}
        isVisible={isVisibleModalCancel}
        toggleModal={toggleModalCancel}
      />
      <SuccessModal
        onSubmit={cleanupMintSuccess}
        mintPurchase={state.successfulMintPurchase}
        isVisible={isVisibleModalSuccess}
        toggleModal={toggleModalSuccess}
      />
      {children}
    </MintingContext.Provider>
  )
}

const useMinting = () => React.useContext(MintingContext)

export { MintingProvider, useMinting }
