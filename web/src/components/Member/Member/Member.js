import MemberDetails from 'src/components/Member/MemberDetails'
import MemberActivityCell from 'src/components/Member/MemberActivityCell'
import GamesCell from 'src/components/Game/GamesCell'
import GameCard from 'src/components/Game/GameCard'

const Member = ({ member }) => {
  // ].sort((a, b) => new Date(a.endTime) < new Date(b.endTime))
  const [activeGame, setActiveGame] = React.useState(null)

  const RightBar = () => {
    if (!activeGame) return <>Select a game to mint</>
    if (activeGame?.treasureId) return <></>
    return (
      <div className="">
        <GameCard game={activeGame} />
      </div>
    )
  }

  return (
    <div className="max-width-container">
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <MemberDetails member={member} />
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
            <h1>Games History</h1>
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
