// Define your own mock data here:
const date = new Date(2019, 4, 24, 10, 33, 30)

const players = [
  {
    username: 'Pi0neerPat',
    userNumber: 1977,
    countryCode: 'ar',
    isGrandMaster: true,
    profilePicSrc:
      'https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.jpg',
  },
  {
    username: 'Josephs',
    userNumber: 2103,
    countryCode: 'us',
    isGrandMaster: true,
    profilePicSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP15FZfst0-N18LQ-T8PoeLOp4b2aJ2J07hA&usqp=CAU',
  },
]

export const standard = () => /* vars, { ctx, req } */ ({
  match: {
    id: 42,
    date,
    bannerColors: ['#E58F2A', '#C76F07'],
    edition: 'WHITE',
    gameType: 'Standard',
    gifUrl: 'https://media0.giphy.com/media/3o6ZsYLRb6IG6vAkcU/giphy.gif',
    lengthOfGame: '10 min',
    notableFeatures: [
      'Knight Under-promotion',
      'Pawn Checkmate',
      'Played 2100+ Rated Games',
    ],
    players,
    title: 'Crazy Pawn Checkmate Comeback',
    winner: 'BLACK',
    wonBy: 'Checkmate',
  },
})
