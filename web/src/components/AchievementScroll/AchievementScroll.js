import styles from './AchievementScroll.module.scss'

const AchievementScroll = (props) => {
  const achievements = props.achievements
  const currentAchievements = props.queryFilter
  const setCurrentAchievements = props.queryFilterFunction

  return (
    <div className={styles.achievementScrollWrapper}>
      <div className={styles.gradientContainer}>
        <div className={styles.achievementScrollArea}>
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
        {/* <div className={styles.topGradient}></div>
        <div className={styles.bottomGradient}></div> */}
      </div>
    </div>
  )
}

export default AchievementScroll
