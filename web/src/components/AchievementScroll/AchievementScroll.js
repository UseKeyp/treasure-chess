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
    <div className="achievementScrollWrapper">
      <div
        ref={scroll}
        id="achievements"
        onScroll={filterBarPosition}
        className="achievementScrollArea"
        data-extend-scroll-area={props.extendScrollArea || false}
        data-show-scrollbar={props.showScrollbar || false}
      >
        {achievements?.map((cheeve, index) => {
          return (
            <div
              className={
                currentAchievements?.includes(cheeve.name)
                  ? 'achievementScrollItem activeScrollItem'
                  : 'achievementScrollItem'
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
      <div className={gradientTop ? 'topGradient' : ''} />
      <div
        className={gradientBottom ? 'bottomGradient' : ''}
        data-extend-scroll-area={props.extendScrollArea || false}
      />
    </div>
  )
}

export default AchievementScroll
