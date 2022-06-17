import { MetaTags } from '@redwoodjs/web'

import Profile from 'src/components/Profile/Profile'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="My Treasure Chess profile" />
      <Profile />
    </>
  )
}

export default ProfilePage
