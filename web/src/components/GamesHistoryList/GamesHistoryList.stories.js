import GamesHistoryList from './GamesHistoryList'

const games = [
  {
    player1: 'Pi0neerPenelopez',
    player2: 'ViraajKhurana',
    date: 'April, 20 2020',
    id: 3123124,
  },
  {
    player1: 'Pi0neerPenelopez',
    player2: 'ViraajKhurana',
    date: 'April, 20 2020',
    id: 415663,
  },
  {
    player1: 'Pi0neerPenelopez',
    player2: 'ViraajKhurana',
    date: 'April, 20 2020',
    id: 3245,
  },
  {
    player1: 'Pi0neerPenelopez',
    player2: 'ViraajKhurana',
    date: 'April, 20 2020',
    id: 6436457457,
  },
  {
    player1: 'Pi0neerPenelopez',
    player2: 'ViraajKhurana',
    date: 'April, 20 2020',
    id: 42143,
  },
  {
    player1: 'Pi0neerPenelopez',
    player2: 'ViraajKhurana',
    date: 'April, 20 2020',
    id: 6347645,
  },
  {
    player1: 'Pi0neerPenelopez',
    player2: 'ViraajKhurana',
    date: 'April, 20 2020',
    id: 324455,
  },
]

const handleMintClick = (id, title) => {
  // eslint-disable-next-line no-console
  console.log(`Minting game with id "${id}" and "${title}" title`)
}

export const generated = () => {
  return (
    <div style={{ height: 550, width: 530 }}>
      <GamesHistoryList games={games} onMintClick={handleMintClick} />
    </div>
  )
}

export default { title: 'Components/GamesHistoryList' }
