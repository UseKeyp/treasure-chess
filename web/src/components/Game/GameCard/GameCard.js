import { P } from 'src/components/Typography'
import Loader from 'src/components/Loader'
import styles from './GameCard.module.scss'
const {
  getBoardLayout,
  getBoardBase64,
} = require('@treasure-chess/chess-image-generator')
import { getCardHtml } from '@treasure-chess/treasure-html'
import { getAchievementNamesFromValues } from '@treasure-chess/treasure-filters'
import placeholderGame from './placeholderGameData'
import { useSpring, animated } from '@react-spring/web'

const calc = (x, y) => [-y / 140, x / 45, 1.05]
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const options = {
  size: 400,
  dark: 'rgb(181, 137, 98)',
  light: 'rgb(241, 216, 180)',
  style: 'neo',
}

const GameCard = ({ game, isMinting, title, showGif }) => {
  const [cardHtml, setCardHtml] = React.useState()
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 4, tension: 450, friction: 40 },
  }))
  const [imageSrc, setImageSrc] = React.useState('/loading-board.png') // Use loading image

  const update = async () => {
    if (isMinting && !game) {
      const rawHtml = await getCardHtml({
        treasure: { ...placeholderGame },
        gifUrl: game.gifUrl,
      })
      setCardHtml(rawHtml)
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
      setCardHtml(rawHtml)
    }
  }

  const fetchImageAndUpdate = async () => {
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
    setImageSrc(boardBase64)
  }

  React.useEffect(() => {
    if (!game) return
    update()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game, title, isMinting, imageSrc])

  React.useEffect(() => {
    if (!showGif) fetchImageAndUpdate()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game])
  if (!isMinting && !game)
    return (
      <div className={styles.gameCardWrapper}>
        <div className={styles.gameCardMintingContainer}>
          <div className={styles.gameCardEmpty}>
            <h2>Select a game</h2>
          </div>
        </div>
      </div>
    )

  return (
    <div className={styles.gameCardWrapper}>
      {isMinting && (
        <>
          <div className={styles.gameCardMintingContainer}>
            <div className={styles.gameCardMintingOverlay} />
            <div className="items-center">
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
        </>
      )}
      <animated.div
        id={`card_${game.id}`}
        className={
          game.tokenId
            ? `${styles.gameCardHtml} ${styles.mintedCardHtml}`
            : `${styles.gameCardHtml} ${styles.isDisabled}`
        }
        onMouseMove={(e) => {
          var div = document
            .getElementById(`card_${game.id}`)
            .getBoundingClientRect()
          set({
            xys: calc(
              e.clientX - div.left - div.width / 2,
              e.clientY - div.top - div.height / 2
            ),
          })
        }}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{
          transform: game.id && !isMinting && props.xys.to(trans),
        }}
        dangerouslySetInnerHTML={{ __html: cardHtml }}
      />
    </div>
  )
}

export default GameCard
