import styles from './AchievementScroll.module.scss'

const AchievementScroll = (props) => {
  const [gradientTop, setGradientTop] = React.useState(false)
  const [gradientBottom, setGradientBottom] = React.useState(true)
  const scroll = React.useRef(null)

  const filterBarPosition = () => {
    const scrollPosition = scroll.current.scrollTop
    const scrollHeight = scroll.current.scrollHeight
    const elementHeight = Math.ceil(
      scroll.current.getBoundingClientRect().height
    )
    if (scrollHeight - scrollPosition === elementHeight) {
      setGradientBottom(false)
      setGradientTop(true)
    } else if (scrollPosition === 0) {
      setGradientBottom(true)
      setGradientTop(false)
    } else {
      setGradientBottom(true)
      setGradientTop(true)
    }
  }

  const achievements = props.achievements
  const currentAchievements = props.queryFilter
  const setCurrentAchievements = props.queryFilterFunction

  return (
    <div className={styles.achievementScrollWrapper}>
      <div
        ref={scroll}
        id="achievements"
        onScroll={filterBarPosition}
        className={styles.achievementScrollArea}
      >
        {achievements?.map((cheeve, index) => {
          return (
            <div
              className={
                currentAchievements?.includes(cheeve.name)
                  ? `${styles.achievementScrollItem} ${styles.activeScrollItem}`
                  : styles.achievementScrollItem
              }
              key={`achievement-${index}`}
              onClick={() => setCurrentAchievements(cheeve.name)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setCurrentAchievements(cheeve.name)
                }
              }}
              role={'button'}
              tabIndex={0}
            >
              <div>{cheeve.name}</div>
              <div>{cheeve.points}</div>
            </div>
          )
        })}
      </div>
      <div className={gradientTop && styles.topGradient} />
      <div className={gradientBottom && styles.bottomGradient} />
    </div>
  )
}

export default AchievementScroll
