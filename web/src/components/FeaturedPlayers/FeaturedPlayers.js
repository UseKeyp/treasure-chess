import { Link, routes } from '@redwoodjs/router'
import HeadingBar from '../HeadingBar/HeadingBar'
import { getFlagBase64 } from '@treasure-chess/treasure-html'
import { featuredPlayers } from 'src/global.config'
import Icon from 'src/components/Icon/Icon'

const FeaturedPlayers = () => {
  const playerIcons = featuredPlayers?.map((player, i) => {
    const flagImageSrc = getFlagBase64(player.country)

    return (
      <Link
        to={routes.treasures({ username: player.username })}
        key={i}
        className="hover:no-underline cursor-pointer"
      >
        <div className=" max-w-[136px] max-h-[170px] p-2 block rounded-xl bg-chessBlack-300 shadow-sm ">
          <img className="w-[120px] rounded-lg" src={player.imageSrc} alt="" />

          <h3 className="text-[12px] font-bold lg:whitespace-nowrap ">
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
      </Link>
    )
  })

  return (
    <>
      <div className="mx-auto max-w-[1080px] mt-16">
        <HeadingBar text="Featured Players" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7 place-items-center ">
          {playerIcons}
          <div className="max-w-[130px] max-h-[170px] h-[100%] p-2 block rounded-xl bg-chessBlack-300 text-center text-xs font-bold text-grey shadow-sm ">
            <Link to={routes.treasures()} className="hover:no-underline">
            <div className="mb-4 mt-4 mr-4 ml-4">
            <Icon
              name="treasure_chess"
              height="82"
              color="#ffffff"
            />
            </div>
              All Treasures
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturedPlayers
