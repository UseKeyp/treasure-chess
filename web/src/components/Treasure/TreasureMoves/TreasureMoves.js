import Avatar from 'src/components/Avatar'
import { RowsSkeleton } from 'src/components/LoadingSkeleton'

const parsePgn = (str) => {
  if (!str) return []
  str = str.replace(/\d+\.\.\. /g, '')
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

const TreasureMoves = ({ treasure, isLoading }) => {
  const list = parsePgn(treasure?.moves)

  return (
    <div className="moves-details">
      <h3 className="moves-details__heading font-bold">Moves</h3>
      <header className="moves-details__players">
        <div className="moves-details__player">
          <span className="moves-details__player-no">White</span>
          <div className="moves-details__player-avatar">
            <div className="mr-2">
              <Avatar src={treasure?.white.imageSrc} size="16px" />
            </div>
            <p className="moves-details__player-nick">
              {treasure?.white.username}
            </p>
          </div>
        </div>
        <div className="moves-details__player">
          <span className="moves-details__player-no">Black</span>
          <div className="moves-details__player-avatar">
            <div className="mr-2">
              <Avatar src={treasure?.black.imageSrc} size="16px" />
            </div>
            <p className="moves-details__player-nick">
              {treasure?.black.username}
            </p>
          </div>
        </div>
      </header>
      {isLoading ? (
        <div className="moves-details__list">
          <RowsSkeleton
            rowCount={50}
            maxHeight={20}
            borderRadius={4}
            marginBottom={4}
          />
        </div>
      ) : (
        <ul className="moves-details__list">
          {list.map((round) => {
            const [turn, white, black] = round

            return (
              <li key={turn} className="moves-details__item">
                <div className="moves-details__item__inner">
                  <span className="moves-details__item__detail--first">
                    {turn}.
                  </span>
                  <span className="moves-details__item__detail--second">
                    {white}
                  </span>
                  <span className="moves-details__item__detail">{black}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default TreasureMoves
