import { useAuth } from '@redwoodjs/auth'
// import { useLazyQuery } from '@apollo/client'
import { P, H3 } from 'src/components/Typography'

import { getOutcomeText } from 'src/utils/helpers'

import { GamesContext } from 'src/providers/context/GamesContext'

import ListItem from './components/ListItem/ListItem'

import { CHECKOUT, MINTING, SUCCESS } from 'src/components/Game/Games/constants'

// const MINT_CHECKOUT_URL = gql`
//   query mintCheckoutUrl(
//     $gameId: String!
//     $endTime: DateTime!
//     $title: String!
//   ) {
//     mintCheckoutUrl(gameId: $gameId, endTime: $endTime, title: $title)
//   }
// `

const Games = ({ games }) => {
  const [context, setContext] = React.useContext(GamesContext)
  const { activeGame, mintingStatus } = context
  // const [mintCheckoutUrl, { loading, error }] = useLazyQuery(
  //   MINT_CHECKOUT_URL,
  //   {
  //     onCompleted: ({ mintCheckoutUrl }) => {
  //       window.open(
  //         mintCheckoutUrl,
  //         'Treasure Chess Checkout',
  //         'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
  //       )
  //       // TODO: Update state to start polling for mintPurchase by gameId,gameEndTime,username
  //
  //       // TODO: Once mintPurchase exists, change UI to show that its actually being minted
  //       // Show link to transaction on block explorer
  //     },
  //   }
  // )

  const { currentUser } = useAuth()
  const onSubmitMint = async (_gameId, _title) => {
    setContext({ ...context, mintingStatus: CHECKOUT })
    await setTimeout(async () => {
      setContext({ ...context, mintingStatus: MINTING })
    }, 2000)
    await setTimeout(async () => {
      setContext({ ...context, mintingStatus: SUCCESS })
    }, 2000)

    // mintCheckoutUrl({
    //   variables: { gameId: game.id, endTime: game.endTime, title: input.title },
    // })
    // TODO: on success update card to show full details?
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

  React.useEffect(() => {
    setContext({ ...context, activeGame: games[0], gameTitle: '' })
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
      <div className="games-history-list__items">
        {games.map((game) => {
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
            />
          )
        })}
      </div>
    </div>
  )
}

export default Games
