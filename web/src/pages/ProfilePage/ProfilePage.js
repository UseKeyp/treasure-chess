import Profile from 'src/components/Profile/Profile'
import { MetaTags } from '@redwoodjs/web'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="My Treasure Chess profile" />
      <Profile />
    </>
  )
}

export default ProfilePage
