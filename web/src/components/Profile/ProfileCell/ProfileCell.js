import Profile from 'src/components/Profile/Profile'

export const QUERY = gql`
  query GetProfileQuery {
    profile {
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

export const Empty = () => <div>Empty</div>

export const Failure = () => <div>Error fetching your profile</div>

export const Success = ({ profile }) => {
  return <Profile profile={profile} />
}
