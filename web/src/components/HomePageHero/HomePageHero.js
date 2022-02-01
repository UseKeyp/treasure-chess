import Button from 'src/components/Button/Button'
import { getCardHtml } from '@treasure-chess/treasure-html'
import { game } from './data.js'

const HomePageHero = () => {
  const [card, setCard] = React.useState()
  const update = async () => {
    const raw = await getCardHtml({
      treasure: { ...game, title: 'Pawn Checkmate' },
      gifUrl:
        'https://images.chesscomfiles.com/uploads/game-gifs/90px/brown/neo/0/cc/0/1/bUMwS2d2NVFmQTlJa3NaUnB4M1ZpcVdPZWchVGZlMk12cE1FeEZWTmxCS0JDS1JLb3c2U2JsQnNqc1NBbEE3ZGVkVENjdUl1QXVDc2RlODZhY3NIcXlIUmVtMVRtazdacGZRQmtqWFB5R1BIdUo_OUpQNjdQWjdaZnVZUWpsQnJsUlpSdUxSWWNkOTdkZVFJTDI3PzJTWVJTMklBZWRyQjJMUklMMEFzMFVza2RjQm1nb21jVT9jdD9Va35VMGNsMExsbm9obkw,.gif',
    })
    setCard(raw)
  }
  React.useEffect(() => {
    update()
  }, [])
  return (
    <div className="h-[800px] md:h-[600px]">
      <div className="treasureContainer">
        <div className="treasureText px-8 pb-4 ">
          <h1 className="capitalize my-6">treasure your chess games</h1>
          <h3 className="mb-6 md:mb-8">
            Every chess game is one-of-a-kind. Make yours a collectible.
          </h3>
          <p className="mb-4 text-center">Connect Your Chess.com Account</p>

          <Button className="treasureButton" to={'/login'}>
            Get Started
          </Button>
        </div>
        <div
          className="min-w-258px mt-2 mx-auto lg:mx-0 md:mt-0"
          dangerouslySetInnerHTML={{ __html: card }}
        />
      </div>
    </div>
  )
}

export default HomePageHero
