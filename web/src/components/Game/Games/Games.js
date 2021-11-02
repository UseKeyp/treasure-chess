import Table from 'src/components/Table'

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

const Games = ({ games, onRowClick }) => {
  const [selectedRowId, setSelectedRowId] = React.useState(games[0].id)

  React.useEffect(() => {
    onRowClick(games[0])
  }, [games, onRowClick])

  const onClick = (id) => {
    const activeGame = games.find((game) => game.id === id)
    onRowClick(activeGame)
    setSelectedRowId(id)
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

  return (
    <Table
      data={formatGamesForTable(games)}
      onRowClick={onClick}
      selectedRowId={selectedRowId}
    />
  )
}

export default Games
