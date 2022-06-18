import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { useWallet } from 'src/providers/wallet'
import { useModal } from 'src/hooks/useModal'
import { useToast } from 'src/providers/toast'
import { MintingToast } from './toasts'
import { CancelModal, SuccessModal, MintModal } from './modals'
import popupLoadingHtml from 'src/utils/popupLoadingHtml'

import {
  PENDING_MINT_PURCHASES_QUERY,
  MINT_CHECKOUT_URL_MUTATION,
  MINT_WITH_CREDIT_MUTATION,
  CANCEL_PURCHASE_MUTATION,
} from './graphql'

import {
  MINT_STATUS_ADDING_FUNDS,
  MINT_STATUS_MINTING,
  MINT_STATUS_SUCCESS,
  FAILED,
  COMPLETE,
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
  const { isVisible: isVisibleModalMint, toggleModal: toggleModalMint } =
    useModal()

  const [state, setState] = React.useState({
    mintStatus: null,
    shouldPoll: false,
    pendingMintPurchases: [],
    successfulMintPurchase: null,
    mintLoading: false,
    title: null,
    gameId: null,
    endTime: null,
  })

  const toastPurchase = (purchase) => {
    // TODO: "Remove toasts"
    // return
    // TODO: Add more data to toasts (links, etc.)
    // if (purchase.orderStatus === RESERVATION)
    //   return toast.loading('Waiting for Wyre', { id: purchase.id })
    // if (purchase.transaction?.status === SUBMITTED)
    //   return toast.loading(<MintingToast mintPurchase={purchase} />, {
    //     id: purchase.id,
    //   })
    // if (purchase.status === COMPLETE)
    //   return toast.success('Success!', { id: purchase.id })
    if (purchase.status === FAILED)
      return toast.error(<MintingToast mintPurchase={purchase} />, {
        id: purchase.id,
      })
    // if (purchase.status === PENDING) {
    //   if (purchase.paymentType === WYRE)
    //     toast.success('Wyre checkout successful!')
    //   toast.loading('Preparing to Mint', { id: purchase.id })
    // }
  }
  useQuery(PENDING_MINT_PURCHASES_QUERY, {
    pollInterval: 5000,
    skip: !state.shouldPoll || !isAuthenticated,
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
          lastPurchase.orderStatus !== purchase.orderStatus ||
          lastPurchase.status !== purchase.status ||
          purchase?.tx?.id || // Handle when previous has no purchase
          lastPurchase?.tx?.id !== purchase?.tx?.id
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
            // TODO: Update selected game data
            // TODO: Update MemberActivity data
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

  const [cancelMintingPurchaseMutation] = useMutation(CANCEL_PURCHASE_MUTATION)

  const onPageLoad = async () => {
    const { data: { pendingMintPurchases } = {} } =
      await pendingMintPurchasesLazyQuery()
    if (!pendingMintPurchases.length) return
    pendingMintPurchases.map((purchase) => toastPurchase(purchase))
    setState({ ...state, pendingMintPurchases, shouldPoll: true })
  }

  const mint = ({ title, gameId, endTime }) => {
    setState({ ...state, title, gameId, endTime })
    toggleModalMint()
  }

  const onConfirmMint = async (paymentType) => {
    setState({
      ...state,
      mintStatus: MINT_STATUS_MINTING,
      mintLoading: true,
      mintError: false,
      mintCheckoutpaymentType: paymentType,
    })
    if (paymentType !== 'CREDIT') {
      let myWindow
      try {
        myWindow = window.open(
          '',
          '_blank',
          'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
        )
        myWindow.document.write(popupLoadingHtml)
        const { data: { mintCheckoutUrl } = {} } =
          await mintCheckoutUrlMutation({
            variables: {
              title: state.title,
              gameId: state.gameId,
              endTime: state.endTime,
              paymentType,
            },
          })
        setState({
          ...state,
          mintStatus: MINT_STATUS_ADDING_FUNDS,
          shouldPoll: true,
          mintLoading: false,
        })
        if (isBrowser) myWindow.location = mintCheckoutUrl
      } catch (error) {
        setState({
          ...state,
          mintStatus: null,
          mintError: error.message,
          mintLoading: false,
        })
        myWindow.document.write(
          `<h3>Oops! An error occured<br/><br/>Sending you back...</h3><p>${error.message}</p>`
        )
        setTimeout(() => {
          myWindow.close()
        }, 3000)
      }
    } else {
      try {
        const { data: { mintWithCredit: mintPurchase } = {} } =
          await mintWithCreditMutation({
            variables: {
              title: state.title,
              gameId: state.gameId,
              endTime: state.endTime,
            },
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

  const cancelMint = () => toggleModalCancel()
  const onConfirmCancel = () => {
    toggleModalCancel()
    const lastPurchase = state.pendingMintPurchases[0]
    setState({
      ...state,
      mintStatus: FAILED,
      mintError: null,
      mintLoading: false,
    })
    try {
      cancelMintingPurchaseMutation({
        variables: { id: lastPurchase.id },
      })
    } catch (error) {
      toastPurchase({ ...lastPurchase })
    }
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
        ...state,
        mint,
        cancelMint,
        clearMintError,
        mintStatus: state.mintStatus,
        mintError: state.mintError,
        mintLoading: state.mintLoading,
        mintCheckoutpaymentType: state.mintCheckoutpaymentType,
      }}
    >
      <MintModal
        onSubmit={onConfirmMint}
        isVisible={isVisibleModalMint}
        toggleModal={toggleModalMint}
        mintCreditBalance={mintCreditBalance}
      />
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
