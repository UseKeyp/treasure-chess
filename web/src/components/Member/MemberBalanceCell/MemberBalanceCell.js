import MemberBalance from 'src/components/Member/MemberBalance'

export const QUERY = gql`
  query FindUserBalanceQuery {
    userBalance: getUsdcBalance
  }
`

export const Loading = () => <MemberBalance />

export const Empty = () => <MemberBalance userBalance={0} />

export const Failure = () => <MemberBalance isError />

export const Success = ({ userBalance }) => {
  return <MemberBalance userBalance={userBalance} />
}
