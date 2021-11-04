import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import MemberActivity from 'src/components/MemberActivity/MemberActivity'
import GamesCell from 'src/components/Game/GamesCell'

const Profile = ({ profile: member }) => {
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <ProfileBox member={member} />
          </div>
          <div>
            <MemberActivity member={member} />
          </div>
        </div>
      </div>
      <br />
      <h1>Game History</h1>
      <GamesCell id={member.id} />
    </div>
  )
}

export default Profile
