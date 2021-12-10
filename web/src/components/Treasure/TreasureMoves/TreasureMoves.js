import DetailsBox from 'src/components/DetailsBox'

const parsePgn = (str) => {
  const list = str
    .split('.')
    .map((line, i) => {
      if (i === 0) return null
      let moves = `${i}${line}`
      moves = moves.split(' ')
      if (moves.length === 4) moves.splice(-1)
      return moves
    })
    .filter((item) => item !== null)
  return list
}
const TABLE_TITLE = 'Moves'

const TreasureMoves = ({ treasure }) => {
  if (!treasure) return <DetailsBox heading={TABLE_TITLE} />
  let list = []
  if (treasure?.moves) list = parsePgn(treasure?.moves)

  return (
    <div
      className="moves-details"
      style={{ minHeight: treasure?.moves.length > 0 ? 0 : 120 }}
    >
      <h3 className="moves-details__heading">{TABLE_TITLE}</h3>
      <ul className="moves-details__list">
        {list?.map((round) => {
          const [turn, white, black] = round

          return (
            <li key={turn} className="moves-details__item">
              <div className="moves-details__item__inner">
                <span className="moves-details__item__detail">{turn}.</span>
                <span className="moves-details__item__detail">{white}</span>
                <span className="moves-details__item__detail">{black}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TreasureMoves
