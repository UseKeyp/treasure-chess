import MemberCell from 'src/components/Member/MemberCell'
import { useAuth } from '@redwoodjs/auth'

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return <MemberCell username={currentUser.username} />
}

export default ProfilePage
