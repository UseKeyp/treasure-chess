import AchievementScroll from './AchievementScroll'
import filters from '@common/filters'

export const generated = () => {
  return <AchievementScroll achievements={filters.achievementList} />
}

export default { title: 'Components/AchievementScroll' }
