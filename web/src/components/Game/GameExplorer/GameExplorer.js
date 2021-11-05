import GamesCell from 'src/components/Game/GamesCell'

import FilterItems from 'src/components/FilterItems'
import { Context } from 'src/providers/context'

const GameExplorer = () => {
  const [context, _setContext] = React.useContext(Context)
  const { activeGame, gameTitle } = context

  const [filter, setFilter] = React.useState()

  const onChangeFilter = (newFilter) => {
    const filterParams = new URLSearchParams(newFilter)
    filterParams.sort()
    setFilter(filterParams.toString())
  }

  const onMintClick = (_game) => {
    // console.log('mint game ', game.id)
  }

  return (
    <div className="grid grid-rows-1">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div style={{ width: 330 }}>
          <FilterItems headline="Filter Games" onChange={onChangeFilter} />
        </div>
        <GamesCell filter={filter} onMintClick={onMintClick} />
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
