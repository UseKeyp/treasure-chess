import { P } from 'src/components/Typography'
import Icon from 'src/components/Icon'
import { trimString } from 'src/utils/helpers'
import { routes, Link } from '@redwoodjs/router'
import { getRarityColor } from '@treasure-chess/treasure-html'

const TreasureLink = ({ treasure }) => {
  let rarityColor = getRarityColor(treasure.achievementScore)
  if (rarityColor === '#8a8886') rarityColor = '#ffffff'
  // const title = treasure.title.slice(0,10)
  const title = trimString(treasure.title, 8)
  return (
    <Link
      to={routes.treasure({ tokenId: treasure.tokenId })}
      className="flex space-x-2 font-bold align-center items-center w-32"
    >
      <Icon name="treasure_chess" color={rarityColor} height="16px" />
      <P fontWeight={700} fontSize={16} color={rarityColor}>
        {title}
      </P>
    </Link>
  )
}

export default TreasureLink
