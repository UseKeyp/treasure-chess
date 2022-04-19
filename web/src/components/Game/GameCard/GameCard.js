import { P } from 'src/components/Typography'
import Loader from 'src/components/Loader'
const {
  getBoardLayout,
  getBoardBase64,
} = require('@treasure-chess/chess-image-generator')
import { getCardHtml } from '@treasure-chess/treasure-html'
import { getAchievementNamesFromValues } from '@treasure-chess/treasure-filters'
import placeholderGame from './placeholderGameData'
import { useSpring, animated } from '@react-spring/web'
import { CardSkeleton } from 'src/components/LoadingSkeleton'

const calc = (x, y) => [-y / 140, x / 45, 1.05]
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const options = {
  size: 400,
  dark: 'rgb(181, 137, 98)',
  light: 'rgb(241, 216, 180)',
  style: 'neo',
}

const GameCard = ({ game, isMinting, isLoading, title, showGif }) => {
  const [cardHtml, setCardHtml] = React.useState()
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 4, tension: 450, friction: 40 },
  }))
  const [imageSrc, setImageSrc] = React.useState('/loading-board.png') // Use loading image
  const ref = React.useRef(null)
  const update = async () => {
    if (isMinting && !game) {
      const rawHtml = await getCardHtml({
        treasure: { ...placeholderGame },
        gifUrl: game.gifUrl,
      })

      ref.current && setCardHtml(rawHtml)
    } else {
      const achievements = game.achievements
        ? getAchievementNamesFromValues(game.achievements)
        : undefined
      const rawHtml = await getCardHtml({
        treasure: {
          ...game,
          achievements,
          title: title || game.title || 'Add a title',
        },
        gifUrl: showGif ? game.gifUrl : imageSrc,
      })
      ref.current && setCardHtml(rawHtml)
    }
  }

  const fetchImageAndUpdate = async () => {
    if (!game) return
    let boardLayout
    try {
      // TODO: properly load the board layout from BE
      boardLayout = JSON.parse(game.boardLayout)
    } catch (e) {
      // console.log(e)
    }
    if (!boardLayout) boardLayout = getBoardLayout(game.moves)
    const boardBase64 = await getBoardBase64(
      boardLayout,
      game.cardColor, // Which player to show on bottom
      options
    )
    if (ref.current) {
      setImageSrc(boardBase64)
    }
  }

  React.useEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  }, [])

  React.useEffect(() => {
    if (!game) return
    update()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game, title, isMinting, imageSrc])

  React.useEffect(() => {
    if (!showGif) fetchImageAndUpdate()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game])

  if (isLoading) return <CardSkeleton />

  if (!isMinting && !game)
    return (
      <div className="container">
        <div className="gameCardWrapper">
          <div className="gameCardMintingContainer">
            <div className="gameCardEmpty">
              <h2>Select a game</h2>
            </div>
          </div>
        </div>
      </div>
    )

  let listAmount = 0
  if (game.marketSaleStatus === 'LISTED' && game.marketSales?.length) {
    let sorted = [...game.marketSales]
    listAmount = sorted.sort((a, b) => a.updatedAt < b.updatedAt)[0].amount
  }

  return (
    <div className="container">
      <div className="gameCardWrapper">
        {isMinting && (
          <div className="gameCardMintingContainer">
            <div className="gameCardMintingOverlay" />
            <div>
              <div className="mb-6 h-full">
                <Loader />
              </div>
              <P
                fontWeight={700}
                className="mt-8"
                fontSize={16}
                color={'chessBlack.100'}
              >
                Minting
                <br />
                in progress
              </P>
            </div>
          </div>
        )}
        <animated.div
          id={`card_${game.id}`}
          className={
            game.tokenId ? 'gameCardHtml mintedCardHtml' : 'gameCardHtml'
          }
          onMouseMove={(e) => {
            var div = document
              .getElementById(`card_${game.id}`)
              .getBoundingClientRect()
            set.start({
              xys: calc(
                e.clientX - div.left - div.width / 2,
                e.clientY - div.top - div.height / 2
              ),
            })
          }}
          onMouseLeave={() => set.start({ xys: [0, 0, 1] })}
          style={{
            transform: game.id && !isMinting && props.xys.to(trans),
          }}
          dangerouslySetInnerHTML={{ __html: cardHtml }}
        />
      </div>
      {listAmount > 0 ? (
        <div className="priceBadge">
          <h2>${listAmount.toLocaleString()}</h2>
        </div>
      ) : null}
    </div>
  )
}

export default GameCard
