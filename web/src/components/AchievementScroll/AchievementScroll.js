import styles from './AchievementScroll.module.scss'

const AchievementScroll = (props) => {
  const achievements = props.achievements
  return (
    <div className={styles.achievementScrollWrapper}>
      <div className={styles.gradientContainer}>
        <div className={styles.achievementScrollArea}>
          {achievements?.map((cheeve, index) => {
            return (
              <div
                className={styles.achievementScrollItem}
                key={`achievement-${index}`}
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
