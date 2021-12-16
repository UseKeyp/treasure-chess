import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import GameExplorer from 'src/components/Game/GameExplorer'

const Profile = ({ profile: member }) => {
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <MemberDetails member={member} isProfile />
          </div>
          <div>
            <MemberActivityCell address={member.address} />
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
