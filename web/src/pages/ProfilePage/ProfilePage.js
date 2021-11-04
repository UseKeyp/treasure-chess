import ProfileCell from 'src/components/Profile/ProfileCell/ProfileCell'
import { useAuth } from '@redwoodjs/auth'

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return <ProfileCell />
}

export default ProfilePage
