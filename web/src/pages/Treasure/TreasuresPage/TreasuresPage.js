import { MetaTags } from '@redwoodjs/web'

import TreasuresCell from 'src/components/Treasure/TreasuresCell'

const TreasuresPage = () => {
  return (
    <>
      <MetaTags
        title="Treasure"
        // description="About the awesome team"
        // ogUrl="https://awesomeredwoodapp.com/start"
        // ogContentUrl="https://awesomeredwoodapp.com/static/og.png"
        // robots={['nofollow']}
      />
      <TreasuresCell />
    </>
  )
}

export default TreasuresPage
