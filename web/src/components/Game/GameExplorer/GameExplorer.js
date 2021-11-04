import Table from 'src/components/Table'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'

import GameCard from 'src/components/Game/GameCard'
import GamesCell from 'src/components/Game/GamesCell'

import FilterItems from 'src/components/FilterItems'
import { Context } from 'src/providers/context'

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
  const [context, setContext] = React.useContext(Context)
  const { activeGame, gameTitle } = context

  const [filter, setFilter] = React.useState()

  const onChangeFilter = (newFilter) => {
    const filterParams = new URLSearchParams(newFilter)
    filterParams.sort()
    console.log(filterParams.toString())
    setFilter(filterParams.toString())
  }

  const onMintClick = (game) => {
    console.log('mint game ', game.id)
  }

  return (
    <div className="grid grid-rows-1">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div style={{ width: 330 }}>
          <FilterItems headline="Filter Games" onChange={onChangeFilter} />
        </div>
        <GamesCell filter={filter} />
        <div>
          {gameTitle}
          <br />
          {JSON.stringify(activeGame)}
        </div>
      </div>
    </div>
  )
}

export default GameExplorer
