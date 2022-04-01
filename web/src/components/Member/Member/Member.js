import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const Member = ({ member, isLoading }) => {
  const twitchSrc = `https://player.twitch.tv/?channel=${member.twitchUsername}&parent=${process.env.APP_DOMAIN}&muted=true&autoplay=true`
  // To test locally, uncomment and use domain "localhost"
  // const twitchSrc = `https://player.twitch.tv/?channel=jpegjames&parent=localhost&muted=true&autoplay=true`
  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <MemberDetails member={member} isLoading={isLoading} />
          <MemberActivityCell usernameOrAddress={member.username} />
        </div>
      </div>
      {member.twitchUsername && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div className="mt-4 px-2 flex justify-center bg-black rounded-xl border-4 border-[#5A3E85]">
            <iframe
              title={`Twitch stream for ${member.twitchUsername}`}
              src={twitchSrc}
              allowFullScreen
              width={400}
              height={300}
            ></iframe>
          </div>
        </div>
      )}

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
