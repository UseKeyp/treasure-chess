// import MiniButton from 'src/components/MiniButton'
import Table from 'src/components/Table/Table'

const TITLE = 'Transaction History'

const MemberActivity = ({ _activity, isLoading }) => {
  // const handleClick = (e) => {
  //   // TODO: trigger action
  //   /* eslint-disable-next-line no-console */
  //   console.log(e)
  // }
  /* eslint-disable-next-line no-console */
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
  if (isLoading) return <Table title={TITLE} isLoading height={250} />
  return (
    <div>
      <Table
        title={TITLE}
        data={activityRows}
        colProportions={[4, 1, 1]}
        height={250}
      />
    </div>
  )
}

export default MemberActivity
