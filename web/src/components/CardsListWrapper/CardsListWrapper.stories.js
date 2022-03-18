import CardsListWrapper from './CardsListWrapper'
import GameCard from '../Game/GameCard/GameCard'

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
    marketSales: [],
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
    marketSales: [{ amount: 1000, status: 'LISTED' }],
  },
]

export const generated = () => {
  return (
    <CardsListWrapper>
      <GameCard game={games[0]} />
      <GameCard game={games[1]} />
      <GameCard game={games[0]} />
      <GameCard game={games[0]} />
      <GameCard game={games[1]} />
      <GameCard game={games[0]} />
      <GameCard game={games[0]} />
      <GameCard game={games[0]} />
      <GameCard game={games[0]} />
      <GameCard game={games[0]} />
      <GameCard game={games[0]} />
    </CardsListWrapper>
  )
}

export default { title: 'Components/CardsListWrapper' }
