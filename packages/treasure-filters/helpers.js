const { achievements } = require('@treasure-chess/chess-achievements')

const getAchievementNamesFromValues = (achievements) =>
  achievements.map((value) => {
    let chiev = achievementList.find((item, index) => item.value === value)
    if (!chiev) return value
    return chiev.name
  })

module.exports = { getAchievementNamesFromValues }
