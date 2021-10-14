import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import MemberActivity from 'src/components/MemberActivity/MemberActivity'
import GamesCell from 'src/components/Game/GamesCell'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import Mint from 'src/components/Mint/Mint'
import GameCard from 'src/components/Game/GameCard'

const Member = ({ member }) => {
  // ].sort((a, b) => new Date(a.endTime) < new Date(b.endTime))
  const [activeGame, setActiveGame] = React.useState(null)

  const RightBar = () => {
    if (!activeGame) return <>Select a game to mint</>
    if (activeGame?.treasureId)
      return <TreasureCardCell id={activeGame.treasureId} />
    return (
      <div className="">
        <GameCard game={activeGame} />
        <Mint game={activeGame} />
      </div>
    )
  }

  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Personal Profile</h1>
            <br />
            <ProfileBox member={member} />
          </div>
          <div>
            <MemberActivity member={member} />
          </div>
        </div>
      </div>
      <br />
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Chess.com Games</h1>
            <GamesCell id={member.id} onRowClick={setActiveGame} />
          </div>
          <div>
            <br />
            <div className="flex justify-center items-center">
              <RightBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Member
