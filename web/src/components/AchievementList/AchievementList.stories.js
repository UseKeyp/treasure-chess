import AchievementList from './AchievementList'

export default {
  title: 'Components/AchievementList',
  component: AchievementList,
}

export const generated = (args) => (
  <div className="flex flex-col lg:flex-row space-y-6 lg:space-x-6 lg:space-y-0">
    <AchievementList isLoading {...args} />
    <AchievementList {...args} />
  </div>
)
