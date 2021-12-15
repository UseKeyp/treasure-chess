import ProfileDetails from 'src/components/Profile/ProfileDetails'
import MemberActivity from 'src/components/MemberActivity/MemberActivity'
import GameExplorer from 'src/components/Game/GameExplorer'

const Profile = ({ profile: member }) => {
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <ProfileDetails member={member} />
          </div>
          <div>
            <MemberActivity member={member} />
          </div>
        </div>
      </div>
      <br />
      <h1>Game History</h1>
      <GameExplorer />
    </div>
  )
}

export default Profile
