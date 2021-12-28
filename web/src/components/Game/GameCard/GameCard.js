import { GamesContext } from 'src/providers/context/GamesContext'
import { P } from 'src/components/Typography'
import Loader from 'src/components/Loader'
import styles from './GameCard.module.scss'
import { Link } from '@redwoodjs/router'

import { getCardHtml } from '@treasure-chess/treasure-html'
import placeholderGame from './placeholderGameData'
import { useSpring, animated } from '@react-spring/web'

const calc = (x, y) => [-y / 140, x / 45, 1.05]
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const GameCard = ({ game, isMinting }) => {
  const [context] = React.useContext(GamesContext)
  const { gameTitle } = context
  const [cardHtml, setCardHtml] = React.useState()
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 4, tension: 450, friction: 40 },
  }))
  const update = async () => {
    let raw
    if (isMinting && !game) {
      raw = await getCardHtml({
        treasure: { ...placeholderGame },
        gifUrl: game.gifUrl,
      })
    } else {
      raw = await getCardHtml({
        treasure: { ...game, title: gameTitle || game.title || 'Add a title' },
        gifUrl: game.gifUrl,
      })
    }
    setCardHtml(raw)
  }

  React.useEffect(() => {
    if (!isMinting && !game) return
    update()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game, gameTitle, isMinting])

  if (!isMinting && !game) return null
  return (
    <div className={styles.gameCardWrapper}>
      {isMinting && (
        <>
          <div className={styles.gameCardMintingContainer}>
            <div className={styles.gameCardMintingOverlay} />
            <div className="items-center">
              <Loader />
              <P fontWeight={700} fontSize={16} color={'chessBlack.100'}>
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
