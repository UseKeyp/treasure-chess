// import MiniButton from 'src/components/MiniButton'
import Table from 'src/components/Table/Table'

const MemberActivity = ({ activity }) => {
  // const handleClick = (e) => {
  //   // TODO: trigger action
  //   /* eslint-disable-next-line no-console */
  //   console.log(e)
  // }
  /* eslint-disable-next-line no-console */
  console.log(activity)
  const activityRows = []
  // activity.map((item) => {
  //   // TODO: Implement real activities
  //   return {
  //     ...item,
  //     Activity: 'Your bid on item 123456789 was accepted!',
  //     Date: 'April, 20 2020',
  //     Action: (
  //       <MiniButton variant="green" onClick={(e) => handleClick(e)}>
  //         View
  //       </MiniButton>
  //     ),
  //   }
  // })

  return (
    <div>
      <Table data={activityRows} colProportions={[4, 1, 1]} maxHeight={250} />
    </div>
  )
}

export default MemberActivity
