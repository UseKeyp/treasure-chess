import filters from '@treasure-chess/treasure-filters'
import props from 'prop-types'

import Table from 'src/components/Table'

const AchievementList = ({ achievements, ...rest }) => {
  return <Table data={achievements} {...rest} />
}

AchievementList.defaultProps = {
  achievements: filters.achievementList
    .sort((a, b) => b.points - a.points)
    .map((achievement) => [
      { text: achievement.name, style: { flex: 2 } },
      { text: achievement.description, style: { flex: 6 } },
      `${achievement.points} Point${achievement.points > 1 ? 's' : ''}`,
    ]),
  title: 'Achievements',
  isLoading: false,
  height: '350px',
  width: '100%',
  rowWidth: '100%',
}

AchievementList.propTypes = {
  achievements: props.array,
  title: props.string,
  isLoading: props.bool,
  height: props.string,
  width: props.string,
}

export default AchievementList
