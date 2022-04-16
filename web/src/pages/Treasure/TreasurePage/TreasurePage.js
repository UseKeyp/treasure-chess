import { MetaTags } from '@redwoodjs/web'
import TreasureCell from 'src/components/Treasure/TreasureCell/TreasureCell'

const TreasurePage = ({ tokenId }) => {
  return (
    <div>
      <MetaTags title="Collectible" />
      <TreasureCell tokenId={tokenId} />
    </div>
  )
}

export default TreasurePage
