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

      <div className="how-to-mint justify-center mt-6 p-4 bg-chessBlack-200">
        <div className="mb-2">
          <div className="text-lg">✨</div>
          <div className="flex justify-between">
            <h3 className="text-base font-bold color-grey-light">
              How to mint new treasures
            </h3>
          </div>
        </div>
        <p className="answer-container text-sm font-normal color-grey-light tracking-tight">
          Click a game below and enter a title. The fee for Minting is $5. You
          can use your Mint Credits or a debit card.
        </p>
      </div>
      <h1 className="mt-6">Games</h1>
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
