// import MiniButton from 'src/components/MiniButton'
import Table from 'src/components/Table/Table'
import { formatDate } from 'src/utils/helpers'
import Icon from 'src/components/Icon/Icon'
import { getRarityColor } from '@treasure-chess/treasure-html'
import TreasureLink from 'src/components/TreasureLink'

const TITLE = 'Activity'

const MemberActivity = ({ member, isLoading }) => {
  const list = []
  if (!member || isLoading)
    return <Table title={TITLE} isLoading height={250} />
  member.treasuresMinted.map((treasure) => {
    list.push([
      formatDate(treasure.createdAt),
      'Minted',
      <TreasureLink treasure={treasure} />,
    ])
  })
  member.treasuresWon.map((treasure) => {
    list.push([
      'Bought',
      // formatDate(treasure.createdAt),
      <TreasureLink treasure={treasure} />,
    ])
  })

  return (
    <div>
      <Table
        title={TITLE}
        data={list}
        colProportions={[4, 1, 1]}
        height={250}
      />
    </div>
  )
}

export default MemberActivity
