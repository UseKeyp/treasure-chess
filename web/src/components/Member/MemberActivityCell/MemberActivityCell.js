import MemberActivity from 'src/components/Member/MemberActivity'

export const QUERY = gql`
  query FindMemberActivityQuery($usernameOrAddress: String!) {
    member(usernameOrAddress: $usernameOrAddress) {
      id
      username
      treasuresMinted {
        id
        createdAt
        title
        tokenId
        achievementScore
        marketSales {
          id
          status
          amount
          updatedAt
          buyer {
            id
            imageSrc
            username
          }
        }
      }
      marketSalesPurchased {
        id
        status
        amount
        updatedAt
        treasure {
          id
          title
          tokenId
          achievementScore
        }
      }
      marketSalesSold {
        id
        status
        amount
        updatedAt
        treasure {
          id
          title
          tokenId
          achievementScore
        }
      }
    }
  }
`

export const Loading = () => <MemberActivity isLoading />

export const Empty = () => <div>Empty</div>

export const Failure = () => <MemberActivity member={[]} />
export const Success = ({ member, refetch }) => {
  return <MemberActivity member={member} refetch={refetch} />
}
