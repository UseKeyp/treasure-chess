import Table from 'src/components/Table'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import Mint from 'src/components/Mint/Mint'
import GameCard from 'src/components/Game/GameCard'
import FilterItems from 'src/components/FilterItems'
import GamesHistoryList from 'src/components/GamesHistoryList'

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

const Games = ({ games }) => {
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

  const formatGamesForTable = (games) => {
    return games.map((game) => {
      return {
        id: game.id,
        Treasure: game.treasureId ? 'Yes' : 'No',
        White: game.whiteUsername,
        Black: game.blackUsername,
        Winner: game.outcome,
        Result: game.termination,
        Moves: game.moveCount,
        Date: formatDate(game.endTime),
      }
    })
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
        <div>
          <GamesHistoryList games={games} onMintClick={onMintClick} />
          {/*<Table
            data={formatGamesForTable(games)}
            onRowClick={onGameClick}
            selectedRowId={activeGame.id}
          /> */}
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  )
}

export default Games
