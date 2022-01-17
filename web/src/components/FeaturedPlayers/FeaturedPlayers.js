import { Link } from '@redwoodjs/router'
import HeaderBar from '../HeaderBar/HeaderBar'
import { getFlagBase64 } from '@treasure-chess/treasure-html'

const FeaturedPlayers = ({ seeAllUrl, players }) => {
  const playerIcons = players?.map((player, i) => {
    const flagImageSrc = getFlagBase64(player.country)

    return (
      <div
        className=" max-w-[136px] max-h-[170px] p-2 block rounded-xl bg-chessBlack-300 shadow-sm"
        key={i}
      >
        <Link to={player.url}>
          <img className="w-[120px] rounded-lg" src={player.imageSrc} alt="" />
        </Link>
        <h3 className="text-[12px] font-bold lg:whitespace-nowrap">
          {player.name}
        </h3>
        <div className="flex items-center">
          <img className="h-3 mr-1" src={flagImageSrc} alt="" />
          <p className="mr-1 text-[10px]">{player.rating}</p>
          <p className="bg-red py-0.5 px-[0.15rem] leading-none rounded-sm font-bold text-[7px] font-sans">
            {player.masterTitle}
          </p>
        </div>
      </div>
    )
  })

  return (
    <div>
      <HeaderBar text="Featured Players" />
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
        {playerIcons}
        <Link to={seeAllUrl}>
          <div className="max-w-[136px] max-h-[170px] h-[100%] p-4 block rounded-xl bg-chessBlack-300 text-center text-xs font-bold text-grey shadow-sm">
            <img
              src="/loading-icon.png"
              alt="Treasure Chess logo"
              className="mb-4"
            />
            All Treasures
          </div>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedPlayers
