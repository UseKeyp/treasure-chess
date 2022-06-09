import AchievementScroll from './AchievementScroll'
import filters from '@treasure-chess/treasure-filters'

export const generated = () => {
  return <AchievementScroll achievements={filters.achievementsList} />
}

export default { title: 'Components/AchievementScroll' }
