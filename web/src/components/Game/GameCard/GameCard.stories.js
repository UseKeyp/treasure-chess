import GameCard from './GameCard'
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
    achievements: 'Played 2000+',
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
    tokenId: 1,
    title: 'Beast from the East',
  },
]

export const white = () => {
  return (
    <>
      <p className="pt-4 pb-4">Minted Treasure</p>
      <GameCard isMinting={false} game={games[2]} />
      <p className="pt-4 pb-4">White Gamecard</p>
      <GameCard isMinting={false} game={games[0]} />
      <p className="pt-4 pb-4">isMinting = true</p>
      <GameCard isMinting={true} game={games[1]} />
    </>
  )
}

export const minting = () => {
  return (
    <>
      <p className="pt-4 pb-4">Minting</p>
      <GameCard isMinting={false} game={games[0]} />
    </>
  )
}

export default { title: 'Components/GameCard' }
