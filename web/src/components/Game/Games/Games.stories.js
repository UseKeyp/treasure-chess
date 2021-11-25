import Games from './Games'

// import { GamesContext } from 'src/providers/context/GamesContext'
import { GamesContext } from 'src/providers/context/GamesContext'

const games = [
  {
    __typename: 'Game',
    id: '30756476687',
    endTime: '2021-11-15T23:08:48.000Z',
    white: { __typename: 'Member', imageSrc: null, country: 'US' },
    black: {
      __typename: 'Member',
      imageSrc:
        'https://images.chesscomfiles-4.com/uploads/v1/user/41479298.3d21e1ba.200x200o.7b825295a3d5.jpeg',
      country: 'US',
    },
    moveCount: 12,
    outcome: 'black',
    termination: 'treasure_joseph won by resignation',
    externalUrl: 'https://www.chess-6.com/game/live/30756476687',
    achievements: null,
    cardColor: 'white',
    ruleVariant: 'Standard',
    whiteRating: 179,
    blackRating: 621,
    timeControl: '60',
    winnerUsername: 'treasure_joseph',
    winnerId: '41479298',
    blackUsername: 'treasure_joseph',
    blackId: '41479298',
    blackMasterTitle: null,
    whiteUsername: 'treasure_patrick',
    whiteId: '41494122',
    whiteMasterTitle: null,
    tokenId: null,
    title: null,
  },
  {
    __typename: 'Game',
    id: '30756476911',
    endTime: '2021-11-15T23:10:39.000Z',
    white: {
      __typename: 'Member',
      imageSrc:
        'https://images.chesscomfiles-4.com/uploads/v1/user/41479298.3d21e1ba.200x200o.7b825295a3d5.jpeg',
      country: 'US',
    },
    black: { __typename: 'Member', imageSrc: null, country: 'US' },
    moveCount: 13,
    outcome: 'white',
    termination: 'treasure_joseph won - game abandoned',
    externalUrl: 'https://www.chess-6.com/game/live/30756476911',
    achievements: null,
    cardColor: 'black',
    ruleVariant: 'Standard',
    whiteRating: 654,
    blackRating: 146,
    timeControl: '60',
    winnerUsername: 'treasure_joseph',
    winnerId: '41479298',
    blackUsername: 'treasure_patrick',
    blackId: '41494122',
    blackMasterTitle: null,
    whiteUsername: 'treasure_joseph',
    whiteId: '41479298',
    whiteMasterTitle: null,
    tokenId: null,
    title: null,
  },
]

export const generated = () => {
  mockCurrentUser({
    username: 'treasure_joseph',
  })

  return (
    <div style={{ height: 550, width: 530 }}>
      <Games games={games} />
    </div>
  )
}
//
// export const checkout = () => {
//   const [context, setContext] = React.useContext(GamesContext)
//
//   mockCurrentUser({
//     username: 'treasure_joseph',
//   })
//   React.useEffect(() => {
//     setContext({ ...context, mintingStatus: 'CHECKOUT' })
//   }, [])
//
//   return (
//     <div style={{ height: 550, width: 530 }}>
//       <Games games={games} />
//     </div>
//   )
// }

export const minting = () => {
  mockCurrentUser({
    username: 'treasure_patrick',
  })

  return (
    <GamesContext.Provider value={{ mintingStatus: 'SUCCESS' }}>
      <div style={{ height: 550, width: 530 }}>
        <Games games={games} />
      </div>
    </GamesContext.Provider>
  )
}

export default { title: 'Components/Games' }
