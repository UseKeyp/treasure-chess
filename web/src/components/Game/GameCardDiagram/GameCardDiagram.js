import GameCard from 'src/components/Game/GameCard/GameCard'
import placeholderData from 'src/components/Game/GameCard/placeholderGameData'

const boardLayout =
  '{"a4":{"type":"p","color":"w"},"a7":{"type":"p","color":"b"},"b1":{"type":"k","color":"w"},"b3":{"type":"q","color":"b"},"b6":{"type":"p","color":"b"},"b7":{"type":"p","color":"b"},"b8":{"type":"k","color":"b"},"c1":{"type":"r","color":"w"},"c2":{"type":"r","color":"w"},"c3":{"type":"r","color":"b"},"c8":{"type":"r","color":"b"},"d3":{"type":"p","color":"w"},"e5":{"type":"p","color":"b"},"f3":{"type":"p","color":"w"},"f5":{"type":"q","color":"w"},"f6":{"type":"p","color":"b"},"g3":{"type":"p","color":"w"},"g5":{"type":"p","color":"b"},"h2":{"type":"p","color":"w"},"h6":{"type":"p","color":"b"}}'
const achievements = ['TheUnderdog', 'Winner1500', 'PawnShy']

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
        text="Opponent"
        position={{ top: 44, left: -40 }}
        connectorPosition={{ top: 10, right: -33 }}
        connecterLength={26}
      />
      <DiagramLabel
        text="The player who minted this card"
        position={{ top: 350, left: -195 }}
        connectorPosition={{ top: 10, right: -33 }}
        connecterLength={26}
      />
      <DiagramLabel
        text="Achievements"
        position={{ top: 430, left: -75 }}
        connectorPosition={{ top: 10, right: -33 }}
        connecterLength={26}
      />
      <DiagramLabel
        text="Color matches the pieces played by the card's minter"
        position={{ top: 50, right: -350 }}
        connectorPosition={{ top: 10, left: -33 }}
        connecterLength={26}
      />
      <DiagramLabel
        text={
          <>
            <span>Rarity</span>
            <ul className="text-xs">
              <li>&lt;6 — Good</li>
              <li>6+ — Great</li>
              <li>11+ — Ultra</li>
              <li>14-15 — Mythic</li>
            </ul>
          </>
        }
        position={{ top: 300, right: -50 }}
        connectorPosition={{ top: 95, left: -50 }}
        connecterLength={42}
      />
      <GameCard
        game={{
          ...placeholderData,
          boardLayout,
          achievements,
          achievementScore: 3,
          rarity: 'Good',
        }}
        title={placeholderData.title}
      />
    </div>
  )
}

export default GameCardDiagram
