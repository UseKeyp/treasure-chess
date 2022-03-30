import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const Member = ({ member, isLoading }) => {
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <MemberDetails member={member} isLoading={isLoading} />
          <MemberActivityCell usernameOrAddress={member.username} />
        </div>
      </div>
      <h1 className="mt-16">Treasures Owned</h1>
      <div className="flex mt-4">
        <TreasuresFetcher owner={member.username} />
      </div>
      <h1 className="mt-16">Treasures Played</h1>
      <div className="flex mt-4">
        <TreasuresFetcher username={member.username} />
      </div>
    </div>
  )
}

export default Member
