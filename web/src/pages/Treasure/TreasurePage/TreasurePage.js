import { MetaTags } from '@redwoodjs/web'
import TreasureCell from 'src/components/Treasure/TreasureCell/TreasureCell'

const TreasurePage = ({ tokenId }) => {
  return (
    <div>
      <MetaTags title="Treasure" />
      <TreasureCell tokenId={tokenId} />
    </div>
  )
}

export default TreasurePage
