import { useAuth } from '@redwoodjs/auth'
import { useLazyQuery } from '@apollo/client'
import { P, H3 } from 'src/components/Typography'

import { getOutcomeText } from 'src/utils/helpers'

import { GamesContext } from 'src/providers/context/GamesContext'
import LoadingDots from 'src/components/LoadingDots'

import ListItem from './components/ListItem/ListItem'

import { CHECKOUT, MINTING, _SUCCESS } from 'src/components/Game/constants'

const MINT_CHECKOUT_URL = gql`
  query mintCheckoutUrl(
    $gameId: String!
    $endTime: DateTime!
    $title: String!
  ) {
    mintCheckoutUrl(gameId: $gameId, endTime: $endTime, title: $title)
  }
`

const Games = ({ games }) => {
  const [context, setContext] = React.useContext(GamesContext)
  const { activeGame, mintingStatus } = context
  const { currentUser } = useAuth()

  const [mintCheckoutUrl, { error: mintCheckoutError }] = useLazyQuery(
    MINT_CHECKOUT_URL,
    {
      onCompleted: ({ mintCheckoutUrl }) => {
        if (mintCheckoutUrl.includes('https')) {
          setContext({ ...context, mintingStatus: CHECKOUT })
          window.open(
            mintCheckoutUrl,
            'Treasure Chess Checkout',
            'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
          )
        } else {
          setContext({ ...context, mintingStatus: MINTING })
        }
      },
    }
  )

  const onSubmitMint = async (title) => {
    await mintCheckoutUrl({
      variables: { gameId: activeGame.id, endTime: activeGame.endTime, title },
    })
  }

  const onChangeTitle = (title) => {
    setContext({ ...context, gameTitle: title })
  }

  const onClickRow = (gameId) => {
    const game = games.find((game) => game.id === gameId)
    setContext({
      ...context,
      activeGame: game,
      gameTitle: '',
      mintingStatus: null, // Reset after successful minting
    })
  }

  const onReset = () => {
    setContext({
      ...context,
      gameTitle: '',
      mintingStatus: null,
    })
  }

  const getItems = () => {
    if (!activeGame && mintingStatus === MINTING)
      return (
        <div className="games-history-list__status">
          Your Treasure is being minted.
          <div className="games-history-list__loading-status">
            This can take up to 3 minutes.
            <LoadingDots className="ml-2" />
          </div>
        </div>
      )
    return games.map((game) => {
      const outcome = getOutcomeText({
        username: currentUser?.username,
        game,
      })
      return (
        <ListItem
          key={game.id}
          game={game}
          onReset={onReset}
          outcome={outcome}
          onClick={onClickRow}
          onChangeTitle={onChangeTitle}
          onSubmit={onSubmitMint}
          isExpanded={game.id === activeGame?.id}
          mintingStatus={mintingStatus}
          errorText={mintCheckoutError?.message}
        />
      )
    })
  }

  React.useEffect(() => {
    setContext({ ...context, gameTitle: '' })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return (
    <div className="games-history-list">
      <div className="games-history-list__heading">
        <H3 mr={10}>Games</H3>
        <P fontSize={12} color="grey">
          {games.length} Games
        </P>
      </div>
      <div className="games-history-list__items">{getItems()}</div>
    </div>
  )
}

export default Games
