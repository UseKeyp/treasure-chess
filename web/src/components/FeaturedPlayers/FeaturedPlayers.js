import { Link } from '@redwoodjs/router'
import HeaderBar from '../HeaderBar/HeaderBar'
import { ReactComponent as TreasureLogo } from 'src/assets/icons/TreasureChessLrg.svg'
const { getFlagBase64 } = require('@treasure-chess/treasure-html')

const FeaturedPlayers = (props) => {
  const players = props.players?.map((player, i) => {
    const flagImageSrc = getFlagBase64(player.country)

    return (
      <div
        className="player w-[136px] h-[170px] p-2 block rounded-xl bg-chessBlack-300 shadow-sm"
        key={i}
      >
        <Link to={player.href}>
          <img className="w-[120px] rounded-lg" src={player.imageSrc} alt="" />
        </Link>
        <h3 className="text-[12px] font-bold whitespace-nowrap">
          {player.name}
        </h3>
        <div className="flex items-center">
          <img className="h-3 mr-1" src={flagImageSrc} alt="" />
          <p className="mr-1 text-[10px]">{player.rating}</p>
          <p className="bg-red rounded-sm font-bold text-[7px] font-sans">
            {player.masterTitle}
          </p>
        </div>
      </div>
    )
  })

  return (
    <div>
      <HeaderBar text="Featured Players" />
      <div className="grid grid-cols-7">
        {players}
        <Link to={props.seeAllUrl}>
          <div className="player w-[136px] h-[170px] p-2 block rounded-xl bg-chessBlack-300 text-center text-xs font-bold text-grey shadow-sm">
            <TreasureLogo />
            All Treasures
          </div>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedPlayers
