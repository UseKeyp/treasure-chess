import { useAuth } from '@redwoodjs/auth'

import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import GameExplorer from 'src/components/Game/GameExplorer'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const Profile = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <></>
  }
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <MemberDetails member={currentUser} isProfile />
          <MemberActivityCell usernameOrAddress={currentUser?.username} />
        </div>
      </div>
      <h1 className="mt-10">Games</h1>
      <div className="mt-4">
        <GameExplorer />
      </div>
      <h1 className="mt-10">Treasures Played</h1>
      <div className="flex mt-4">
        <TreasuresFetcher
          limit
          username={currentUser?.username}
          sort="Most Rare"
        />
      </div>
      <h1 className="mt-10">Treasures Owned</h1>
      <div className="flex mt-4">
        <TreasuresFetcher owner={currentUser?.username} sort="Most Rare" />
      </div>
    </div>
  )
}

export default Profile
