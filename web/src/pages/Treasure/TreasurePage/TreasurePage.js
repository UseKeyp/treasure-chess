import { MetaTags } from '@redwoodjs/web'

import TreasureCell from 'src/components/Treasure/TreasureCell/TreasureCell'
import { useMetaTags } from 'src/providers/metatags/metaTags'

const TreasurePage = ({ tokenId }) => {
  const { tags } = useMetaTags()

  console.log(tags)
  return (
    <div className="item-page max-width-container">
      <MetaTags
        title={tags?.title}
        description={tags?.description}
        ogUrl={tags?.ogUrl}
        ogContentUrl={tags?.ogContentUrl}
      />
      <TreasureCell tokenId={tokenId} />
    </div>
  )
}

export default TreasurePage
