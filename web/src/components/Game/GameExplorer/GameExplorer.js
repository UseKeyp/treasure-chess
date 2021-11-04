import Table from 'src/components/Table'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import Mint from 'src/components/Mint/Mint'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'
import GamesCell from 'src/components/Games/GamesCell/GamesCell'

const formatDate = (date) => {
  return (
    <>
      {new Date(date).getMonth() + 1}
      {'/'}
      <span className="green-text">{new Date(date).getDate()}</span>
      {'/'}
      {new Date(date).getFullYear()}
    </>
  )
}

const GameExplorer = () => {
  const [activeGame, setActiveGame] = React.useState(games[0].id)

  const onGameClick = (id) => {
    const active = games.find((game) => game.id === id)
    setActiveGame(active)
  }

  const onChangeFilter = (newFilter) => {
    console.log(newFilter)
  }

  const onMintClick = (game) => {
    console.log('mint game ', game.id)
  }

  const RightBar = () => {
    return <>Select a game to mint</>
    // if (!activeGame) return <>Select a game to mint</>
    // if (activeGame?.treasureId)
    //   return <TreasureCardCell id={activeGame.treasureId} />
    // return (
    //   <div className="">
    //     <GameCard game={activeGame} />
    //     <Mint game={activeGame} />
    //   </div>
    // )
  }

  return (
    <div className="grid grid-rows-1">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div style={{ width: 330 }}>
          <FilterItems headline="Filter Games" onChange={onChangeFilter} />
        </div>
        <GamesCell />
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  )
}

export default GameExplorer
