import ProfileBox from 'src/components/ProfileBox/ProfileBox'
import MemberActivityCell from 'src/components/MemberActivity/MemberActivityCell'
import GamesCell from 'src/components/Game/GamesCell'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import MintTreasure from 'src/components/Treasure/MintTreasure'
import GameCardCell from 'src/components/Game/GameCardCell'

const Member = ({ member }) => {
  const treasuresList = [
    ...member.treasuresPlayedBlack,
    ...member.treasuresPlayedWhite,
  ].sort((a, b) => new Date(a.endTime) < new Date(b.endTime))
  const [activeGame, setActiveGame] = React.useState(treasuresList[0])
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
            <MemberActivityCell address={member.address} />
          </div>
        </div>
      </div>
      <br />
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <h1>Chess.com Games</h1>
            <GamesCell
              id={member.id}
              onRowClick={setActiveGame}
              selectedRowId={activeGame.id}
            />
          </div>
          <div>
            <br />
            <div className="flex justify-center items-center">
              {activeGame.treasureId ? (
                <TreasureCardCell id={activeGame.treasureId} />
              ) : (
                <>
                  <GameCardCell
                    id={activeGame.id}
                    memberId={member.id}
                    endTime={activeGame.endTime}
                  />
                  <MintTreasure game={activeGame} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Member
