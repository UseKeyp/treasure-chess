import { useQuery, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useToast } from 'src/providers/toast'
import { useWallet } from 'src/providers/wallet'
import { useModal } from 'src/hooks/useModal'
import { ConfirmModal } from './modals'
import { TxToast } from './toasts'
import Confetti from 'src/components/Confetti'
import { useLocation } from '@redwoodjs/router'

import {
  TREASURE_WITH_MARKET_SALES_QUERY,
  LIST_MARKET_SALE_MUTATION,
  UNLIST_MARKET_SALE_MUTATION,
  BUY_MARKET_SALE_MUTATION,
} from './graphql'

import {
  PENDING_LISTED,
  LISTED,
  PENDING_SOLD,
  SOLD,
  PENDING_DELISTED,
  DELISTED,
  FAILED,
} from './constants'

const MarketContext = React.createContext({
  marketStatus: null,
  marketLoading: true,
  amount: null,
  isOwner: false,
  marketSale: {},
})

const MarketProvider = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth()
  const { usdcBalance } = useWallet()
  const { toast } = useToast()
  const { pathname } = useLocation()

  const { isVisible: isVisibleModalConfirm, toggleModal: toggleModalConfirm } =
    useModal()

  const [state, setState] = React.useState({
    marketStatus: null,
    marketLoading: true,
    amount: null,
    isOwner: false,
    actionData: {},
    tokenId: pathname.split('treasures/')[1],
  })

  const toastAction = (type, txHash) => {
    // TODO: Add more data to toasts (links, etc.)
    if (type === PENDING_LISTED)
      return toast.loading(<TxToast text="Listing" txHash={txHash} />, {
        id: state.treasure.id,
      })
    if (type === PENDING_DELISTED)
      return toast.loading(<TxToast text="Unlisting" txHash={txHash} />, {
        id: state.treasure.id,
      })
    if (type === PENDING_SOLD)
      return toast.loading(<TxToast text="Buying" txHash={txHash} />, {
        id: state.treasure.id,
      })

    if (type === FAILED)
      return toast.error('Failure', { id: state.treasure.id })
    if (type === LISTED)
      return toast.success('Listed!', { id: state.treasure.id })
    if (type === DELISTED)
      return toast.success('Unlisted!', { id: state.treasure.id })
    if (type === SOLD)
      return toast.success('Bought!', { id: state.treasure.id })
  }

  useQuery(TREASURE_WITH_MARKET_SALES_QUERY, {
    pollInterval: 10000,
    fetchPolicy: 'network-only',
    skip: !state.tokenId,
    variables: { tokenId: state.tokenId },
    onError: () => {
      setState({ ...state, marketLoading: false })
    },
    onCompleted: async ({ treasureWithMarketSales } = {}) => {
      if (!treasureWithMarketSales) return
      const last = state?.marketSale || {}
      const current =
        [...treasureWithMarketSales.marketSales].sort(
          (a, b) => b.id - a.id
        )[0] || {}
      if (current.status === last.status)
        return setState({
          ...state,
          treasure: treasureWithMarketSales,
          marketSale: false,
          marketLoading: false,
        })
      const { status, isClosed, amount } = current
      let shouldPoll = false

      if (status.includes('PENDING')) shouldPoll = true
      setState({
        ...state,
        treasure: treasureWithMarketSales,
        marketSale: current,
        marketStatus: status,
        marketLoading: false,
        actionData: {},
        actionLoading: false,
        actionError: null,
        actionStatus: status,
        isClosed,
        amount,
        shouldPoll,
      })
      if (currentUser?.id === current.sellerId) {
        // Toast list/unlist/gift
        if (current.listTx?.status === FAILED) return toastAction(FAILED)
        if (current.unlistTx?.status === FAILED) return toastAction(FAILED)
        toastAction(status)
      } else if (currentUser?.id === current.buyerId) {
        // Toast purchases
        if (current.buyTx?.status === FAILED) return toastAction(FAILED)
        toastAction(status)
      }
    },
  })

  const [listTreasureMutation] = useMutation(LIST_MARKET_SALE_MUTATION)
  const [unlistTreasureMutation] = useMutation(UNLIST_MARKET_SALE_MUTATION)
  const [buyTreasureMutation] = useMutation(BUY_MARKET_SALE_MUTATION)

  const onConfirmList = async () => {
    try {
      setState({
        ...state,
        actionLoading: true,
        actionStatus: PENDING_LISTED,
        shouldPoll: true,
      })
      const { data: { marketSale } = {} } = await listTreasureMutation({
        variables: {
          tokenId: state.tokenId,
          amount: Number(state.actionData.amount),
        },
      })
      setState({
        ...state,
        marketSale,
        actionLoading: true,
        actionStatus: PENDING_LISTED,
        shouldPoll: true,
      })
      toastAction(PENDING_LISTED, marketSale.listTxId)
    } catch (error) {
      setState({
        ...state,
        actionLoading: false,
        actionError: error.message,
        actionStatus: null,
      })
    }
  }
  const onConfirmDelist = async () => {
    try {
      setState({
        ...state,
        actionLoading: true,
        actionStatus: PENDING_DELISTED,
      })
      const { data: { marketSale } = {} } = await unlistTreasureMutation({
        variables: { tokenId: state.tokenId },
      })
      setState({
        ...state,
        marketSale,
        actionLoading: true,
        actionStatus: PENDING_DELISTED,
      })
      toastAction(PENDING_DELISTED, marketSale.unlistTxId)
    } catch (error) {
      setState({
        ...state,
        actionLoading: false,
        actionError: error.message,
        actionStatus: null,
      })
    }
  }
  const onConfirmBuy = async () => {
    try {
      if (usdcBalance < state.amount)
        throw new Error(
          "You don't have enough funds to purchase this Treasure."
        )
      setState({
        ...state,
        actionLoading: true,
        actionStatus: PENDING_SOLD,
      })
      const { data: { marketSale } = {} } = await buyTreasureMutation({
        variables: { tokenId: state.tokenId },
      })
      setState({
        ...state,
        marketSale,
        actionLoading: true,
        actionStatus: PENDING_SOLD,
      })
      toastAction(PENDING_SOLD, marketSale.saleTransactions[0].id)
    } catch (error) {
      setState({
        ...state,
        actionLoading: false,
        actionError: error.message,
        actionStatus: null,
      })
    }
  }

  const list = (listAmount) => {
    setState({
      ...state,
      actionData: { amount: listAmount, type: PENDING_LISTED },
      actionLoading: false,
      actionStatus: null,
      actionError: null,
    })
    toggleModalConfirm()
  }
  const unlist = () => {
    setState({
      ...state,
      actionData: { type: PENDING_DELISTED },
      actionLoading: false,
      actionStatus: null,
      actionError: null,
    })
    toggleModalConfirm()
  }
  const buy = () => {
    if (!currentUser)
      return setState({
        ...state,
        actionError: 'You must be logged in to do that.',
      })
    setState({
      ...state,
      actionData: {
        type: PENDING_SOLD,
        amount: state.amount,
      },
      actionLoading: false,
      actionStatus: null,
      actionError: null,
    })
    toggleModalConfirm()
  }
  const gift = () => {
    setState({ ...state, actionError: 'This feature is coming soon' })
  }

  React.useEffect(() => {
    if (authLoading || !currentUser || !state.treasure) return
    if (currentUser.id === state.treasure.ownerId)
      setState({ ...state, isOwner: true })
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [currentUser, state.treasure, authLoading])

  React.useEffect(() => {
    const tokenId = pathname.split('treasures/')[1]
    setState({ ...state, tokenId })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pathname])

  const onSubmit = () => {
    if (state.actionData.type === PENDING_LISTED) return onConfirmList()
    if (state.actionData.type === PENDING_DELISTED) return onConfirmDelist()
    if (state.actionData.type === PENDING_SOLD) return onConfirmBuy()
  }
  return (
    <MarketContext.Provider
      value={{
        // State
        amount: state.amount,
        isOwner: state.isOwner,
        // Treasure market sale details
        marketStatus: state.marketStatus,
        marketLoading: state.marketLoading,
        // User actions
        buy,
        list,
        unlist,
        gift,
        // User action details
        actionStatus: state.actionStatus,
        actionError: state.actionError,
        actionLoading: state.actionLoading,
      }}
    >
      <ConfirmModal
        data={state.actionData}
        onSubmit={onSubmit}
        isVisible={isVisibleModalConfirm}
        toggleModal={toggleModalConfirm}
      />
      {state.actionStatus === SOLD && <Confetti type="rain" />}
      {children}
    </MarketContext.Provider>
  )
}

const useMarket = () => React.useContext(MarketContext)

export { MarketProvider, useMarket }
