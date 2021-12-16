import LoadingDots from 'src/components/LoadingDots'

const MemberBalance = ({ userBalance, isError }) => {
  if (isError)
    return (
      <div className="memberBalance">
        <h4 className="memberBalance__title">Couldn&apos;t get balance</h4>
      </div>
    )
  return (
    <div className="memberBalance">
      <h4 className="memberBalance__title">Balance</h4>
      <h4 className="memberBalance__balance">
        {userBalance ? `$${userBalance}` : <LoadingDots />}
      </h4>
    </div>
  )
}

export default MemberBalance
