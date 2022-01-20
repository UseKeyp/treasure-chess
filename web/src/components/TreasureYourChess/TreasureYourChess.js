import Button from 'src/components/Button/Button'
//import { getCardHtml } from '@treasure-chess/treasure-html'
//import { GamesContext } from 'src/providers/games'

const TreasureYourChess = () => {
  const gif =
    'https://images.chesscomfiles.com/uploads/game-gifs/90px/brown/neo/0/cc/0/0/bUNaUmxCIVRiczJVY3U5MmRsWVFudlhIZ201WnVWMlZsVjZYaXEwS2VjNzBjYldPbWM4NmNyS0JkQlFJQmRaUG93NjVyR1g0ZnhSSlZENVdoZUpCc0pQSkNKMFJkQklCZTBXUERCUEdqekd5QnNSSjBXNFhXWEpBc1R5cVRPcXprc3pzT2FzbGFqbGR4ZjdsWFpsWmZBSEFqP1p0PzRBczR5ZGV2RDFMYmN0bHlX.gif'
  //const [imageSrc, setImageSrc] = React.useState('/loading-board.png')
  //const [context] = React.useContext(GamesContext)
  // const { activeGame } = context
  // const [img, setImg] = React.useState()

  // React.useEffect(() => {
  //   loadImage()
  // }, [])

  // const loadImage = async () => {
  //   const raw = await getCardHtml({
  //     treasure: { title: 'My Game' },
  //     gifUrl: gif,
  //   })
  //   setImg(raw)
  // }

  return (
    <div className="treasureContainer">
      <div className="treasureText px-8">
        <h1 className="capitalize my-6">tresure your chess games</h1>
        <h3 className="mb-8">
          Every chess game is one-of-a-kind. Make yours a collectible.
        </h3>
        <p className="mb-4 text-center">Connect Your Chess.com Account</p>
        <Button className={'treasureButton'} to={'/login'}>
          Login
        </Button>
      </div>
      {/* <div className="" dangerouslySetInnerHTML={{ __html: img }} /> */}
      <img src={gif} alt="gif-hero" className="treasureImage" />
    </div>
  )
}

export default TreasureYourChess
