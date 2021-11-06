import Games from './Games'

const games = [
  {
    whiteUsername: 'Pi0neerPenelopez',
    blackUsername: 'ViraajKhurana',
    date: new Date(),
    id: 3123124,
  },
  {
    whiteUsername: 'Pi0neerPenelopez',
    blackUsername: 'ViraajKhurana',
    date: new Date(),
    id: 415663,
  },
  {
    whiteUsername: 'Pi0neerPenelopez',
    blackUsername: 'ViraajKhurana',
    date: new Date(),
    id: 3245,
  },
  {
    whiteUsername: 'Pi0neerPenelopez',
    blackUsername: 'ViraajKhurana',
    date: new Date(),
    id: 6436457457,
  },
  {
    whiteUsername: 'Pi0neerPenelopez',
    blackUsername: 'ViraajKhurana',
    date: new Date(),
    id: 42143,
  },
  {
    whiteUsername: 'Pi0neerPenelopez',
    blackUsername: 'ViraajKhurana',
    date: new Date(),
    id: 6347645,
  },
  {
    whiteUsername: 'Pi0neerPenelopez',
    blackUsername: 'ViraajKhurana',
    date: new Date(),
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
      <Games games={games} onMintClick={handleMintClick} />
    </div>
  )
}

export default { title: 'Components/Games' }
