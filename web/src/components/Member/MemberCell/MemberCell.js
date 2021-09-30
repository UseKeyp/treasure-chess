import Member from 'src/components/Member/Member'

export const QUERY = gql`
  query FindMemberById($username: String!) {
    member: member(username: $username) {
      id
      username
      address
      imageSrc
      country
      masterTitle
      treasuresPlayedWhite {
        id
        endTime
        moveCount
        outcome
        winner {
          id
        }
      }
      treasuresPlayedBlack {
        id
        endTime
        outcome
        moveCount
        winner {
          id
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Member not found</div>

export const Success = ({ member }) => {
  return <Member member={member} />
}
