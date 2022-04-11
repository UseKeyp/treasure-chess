import { useAuth } from '@redwoodjs/auth'

import Table from 'src/components/Table'

import { getOutcomeText } from 'src/utils/helpers'
import { useMinting } from 'src/providers/minting'
import Pagination from 'src/components/Pagination/Pagination'
import { GAMES_PER_PAGE } from '@treasure-chess/treasure-filters'
import LoadingDots from 'src/components/LoadingDots'

import { GamesContext } from 'src/providers/games'

import ListItem from './components/ListItem/ListItem'

const Games = ({ games, count: queryCount, isLoading, error }) => {
  const { currentUser } = useAuth()
  const { mint, cancelMint } = useMinting()

  const [gamesContext, setGamesContext] = React.useContext(GamesContext)
  const { activeGame, page, count } = gamesContext

  const onSubmitMint = (title) => {
    mint({
      title,
      gameId: activeGame.id,
      endTime: activeGame.endTime,
    })
  }

  const onChangeTitle = (title) => {
    'title change!'
    setGamesContext({ ...gamesContext, gameTitle: title })
  }

  const onClickRow = (gameId) => {
    const game = games.find((game) => game.id === gameId)
    setGamesContext({
      ...gamesContext,
      activeGame: game,
      gameTitle: '',
    })
  }

  const onReset = () => {
    cancelMint({ gameId: activeGame.id, endTime: activeGame.endTime })
    setGamesContext({
      ...gamesContext,
      gameTitle: '',
    })
  }

  const onChangePage = (pageNumber) => {
    setGamesContext({ ...gamesContext, page: pageNumber - 1 })
  }

  const getItems = () =>
    games?.map((game) => {
      const outcome = getOutcomeText({
        username: currentUser?.username,
        game,
      })
      return (
        <ListItem
          key={game.id}
          game={game}
          onReset={onReset}
          outcome={outcome}
          onClick={onClickRow}
          onChangeTitle={onChangeTitle}
          onSubmit={onSubmitMint}
          isExpanded={game.id === activeGame?.id}
        />
      )
    })

  React.useEffect(() => {
    setGamesContext({ ...gamesContext, gameTitle: '' })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])
  React.useEffect(() => {
    if (queryCount !== undefined && queryCount !== count)
      setGamesContext({ ...gamesContext, count: queryCount })
  }, [queryCount])

  return (
    <div className=" max-w-[530px]">
      <Table
        title={
          <div className="flex justify-between align-center items-center ">
            <div className="flex space-x-2 align-center">
              {count !== undefined ? <h3>{count}</h3> : <LoadingDots />}
              <h3>Games</h3>
            </div>
            <Pagination
              count={count}
              page={page + 1 || 1}
              perPage={GAMES_PER_PAGE}
              onChangePage={onChangePage}
              isLoading={count === undefined}
            />
          </div>
        }
        // rowHeight={80}
        isLoading={isLoading}
        error={error && 'Failed to load games'}
        height={500}
        data={getItems()}
      />
    </div>
  )
}

export default Games
