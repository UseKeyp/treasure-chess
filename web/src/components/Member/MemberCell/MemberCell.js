import Member from 'src/components/Member/Member'
import Loader from 'src/components/Loader'

export const QUERY = gql`
  query FindMemberByUsernameOrAddress($usernameOrAddress: String!) {
    member(usernameOrAddress: $usernameOrAddress) {
      id
      username
      address
      imageSrc
      country
      masterTitle
      twitchUsername
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

export const Loading = () => <Loader />

export const Error = () => <div>Member not found</div>

export const Empty = () => <div>Member not found</div>

export const Success = ({ member }) => {
  return <Member member={member} />
}
