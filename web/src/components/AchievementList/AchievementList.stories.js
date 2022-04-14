import AchievementList from './AchievementList'

export default {
  title: 'Components/AchievementList',
  component: AchievementList,
}

export const generated = (args) => (
  <div className="flex flex-row space-x-6">
    <AchievementList isLoading {...args} />
    <AchievementList {...args} />
  </div>
)
