import AchievementScroll from './AchievementScroll'
import { achievements } from './achievements'

export const generated = () => {
  return <AchievementScroll achievements={achievements} />
}

export default { title: 'Components/AchievementScroll' }
