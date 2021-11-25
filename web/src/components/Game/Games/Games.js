import { useAuth } from '@redwoodjs/auth'
// import { useLazyQuery } from '@apollo/client'

import { Context } from 'src/providers/context'
import { getOutcomeText } from 'src/utils/helpers'
import { P, H3 } from 'src/components/Typography'

import ListItem from './components/ListItem/ListItem'

import {
  UNMINTED,
  CHECKOUT,
  MINTING,
  SUCCESS,
} from 'src/components/Game/Games/constants'

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
  const [context, setContext] = React.useContext(Context)
  // const { activeGame, mintingStatus } = context
  return <>{JSON.stringify(games)}</>
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

  const onSubmitMint = async (gameId, title) => {
    setContext({ ...context, mintingStatus: CHECKOUT })
    // Call the mint function here
    await setTimeout(function () {
      setContext({ ...context, mintingStatus: MINTING })
    }, 2000)
    await setTimeout(function () {
      setContext({ ...context, mintingStatus: SUCCESS })
    }, 2000)
    // mintCheckoutUrl({
    //   variables: { gameId: game.id, endTime: game.endTime, title: input.title },
    // })
  }

  const onChangeTitle = (title) => {
    setContext({ ...context, gameTitle: title })
  }

  const onClickRow = async (gameId) => {
    const game = games.find((game) => game.id === gameId)
    setContext({ ...context, activeGame: game, gameTitle: '' })
  }

  React.useEffect(() => {
    setContext({ ...context, activeGame: games[0], gameTitle: '' })
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
            username: currentUser.username,
            game,
          })
          return (
            <ListItem
              key={game.id}
              game={game}
              // game={{ ...game, tokenId: 1, title: 'My Title' }}
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
