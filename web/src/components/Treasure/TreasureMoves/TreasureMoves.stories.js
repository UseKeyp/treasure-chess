import TreasureMoves from './TreasureMoves'
import exampleTreasures from '../../../../../scripts/seed/treasure'
import exampleMembers from '../../../../../scripts/seed/member'

export const generated = () => {
  return (
    <div style={{ maxWidth: 530 }}>
      <TreasureMoves
        treasure={{
          ...exampleTreasures[0],
          black: exampleMembers[0],
          white: exampleMembers[1],
        }}
      />
    </div>
  )
}
export const loading = () => {
  return (
    <div style={{ maxWidth: 530 }}>
      <TreasureMoves />
    </div>
  )
}

export default { title: 'Components/TreasureMoves' }
