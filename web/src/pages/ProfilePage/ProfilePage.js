import MemberCell from 'src/components/Member/MemberCell'
import { useAuth } from '@redwoodjs/auth'

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return <MemberCell usernameOrAddress={currentUser.username} />
}

export default ProfilePage
