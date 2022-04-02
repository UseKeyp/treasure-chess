import { MetaTags } from '@redwoodjs/web'
import TreasureCell from 'src/components/Treasure/TreasureCell/TreasureCell'

const TreasurePage = ({ tokenId }) => {
  return (
    <div className="item-page max-width-container">
      <MetaTags title="Treasure" description="About the awesome team" />
      <TreasureCell tokenId={tokenId} />
    </div>
  )
}

export default TreasurePage
