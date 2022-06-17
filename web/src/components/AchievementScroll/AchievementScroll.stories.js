import filters from '@treasure-chess/treasure-filters'

import AchievementScroll from './AchievementScroll'

export const generated = () => {
  return <AchievementScroll achievements={filters.achievementList} />
}

export default { title: 'Components/AchievementScroll' }
