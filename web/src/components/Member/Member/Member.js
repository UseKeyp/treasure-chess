import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const Member = ({ member }) => {
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <MemberDetails member={member} />
          </div>
          <div>
            <MemberActivityCell member={member.address} />
          </div>
        </div>
      </div>
      <h1 className="mt-8">Treasures Owned</h1>
      <div className="flex mt-4">
        <TreasuresFetcher owner={member.username} />
      </div>
      <h1 className="mt-8">Treasures Played</h1>
      <div className="flex mt-4">
        <TreasuresFetcher username={member.username} />
      </div>
    </div>
  )
}

export default Member
