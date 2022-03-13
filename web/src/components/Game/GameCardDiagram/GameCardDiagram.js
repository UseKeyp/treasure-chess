import GameCard from 'src/components/Game/GameCard/GameCard'
import placeholderData from 'src/components/Game/GameCard/placeholderGameData'

const boardLayout =
  '{"a4":{"type":"p","color":"w"},"a7":{"type":"p","color":"b"},"b1":{"type":"k","color":"w"},"b3":{"type":"q","color":"b"},"b6":{"type":"p","color":"b"},"b7":{"type":"p","color":"b"},"b8":{"type":"k","color":"b"},"c1":{"type":"r","color":"w"},"c2":{"type":"r","color":"w"},"c3":{"type":"r","color":"b"},"c8":{"type":"r","color":"b"},"d3":{"type":"p","color":"w"},"e5":{"type":"p","color":"b"},"f3":{"type":"p","color":"w"},"f5":{"type":"q","color":"w"},"f6":{"type":"p","color":"b"},"g3":{"type":"p","color":"w"},"g5":{"type":"p","color":"b"},"h2":{"type":"p","color":"w"},"h6":{"type":"p","color":"b"}}'

const DiagramLabel = ({
  text,
  position,
  connectorPosition,
  connecterLength,
}) => {
  return (
    <div className="game-card-diagram--label" style={{ ...position }}>
      <div className="relative">
        {text}
        <div
          style={{ ...connectorPosition, width: connecterLength }}
          className="game-card-diagram--label--connector"
        />
      </div>
    </div>
  )
}

const GameCardDiagram = () => {
  return (
    <div className="game-card-diagram">
      <DiagramLabel
        text="Winner"
        position={{ top: 44, left: -20 }}
        connectorPosition={{ top: 10, right: -33 }}
        connecterLength={26}
      />
      <DiagramLabel
        text="Loser"
        position={{ top: 350, left: -6 }}
        connectorPosition={{ top: 10, right: -33 }}
        connecterLength={26}
      />
      <DiagramLabel
        text="Color"
        position={{ top: 350, right: -6 }}
        connectorPosition={{ top: 10, left: -33 }}
        connecterLength={26}
      />
      <GameCard
        game={{ ...placeholderData, boardLayout }}
        title="Example Game"
      />
    </div>
  )
}

export default GameCardDiagram
