import { MetaTags } from '@redwoodjs/web'

import TreasureMovesCell from 'src/components/Treasure/TreasureMovesCell'
import TreasureSocialCell from 'src/components/Treasure/TreasureSocialCell'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'

const TreasurePage = ({ tokenId }) => {
  return (
    <div className="item-page max-width-container">
      <MetaTags
        title="Treasure"
        // description="About the awesome team"
        // ogUrl="https://awesomeredwoodapp.com/start"
        // ogContentUrl="https://awesomeredwoodapp.com/static/og.png"
        // robots={['nofollow']}
      />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div className="flex justify-center">
          <TreasureCardCell tokenId={tokenId} />
        </div>
        <TreasureSocialCell tokenId={tokenId} />
        <TreasureMovesCell tokenId={tokenId} />
      </div>
    </div>
  )
}

export default TreasurePage
