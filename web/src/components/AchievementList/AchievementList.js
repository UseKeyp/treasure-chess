import props from 'prop-types'
import filters from '@treasure-chess/treasure-filters'

import Table from 'src/components/Table'

const AchievementList = ({ achievements, ...rest }) => {
  return <Table data={achievements} {...rest} />
}

AchievementList.defaultProps = {
  achievements: filters.achievementList
    .sort((a, b) => b.points - a.points)
    .map((achievement) => [
      achievement.name,
      achievement.description,
      achievement.points,
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
