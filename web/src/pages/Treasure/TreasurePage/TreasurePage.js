import { MetaTags } from '@redwoodjs/web'

import Treasure from 'src/components/Treasure/Treasure'

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
      <Treasure tokenId={tokenId} />
    </div>
  )
}

export default TreasurePage
