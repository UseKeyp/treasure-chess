import { Link, routes } from '@redwoodjs/router'

import Icon from 'src/components/Icon/Icon'

const SeeMore = ({ to = routes.treasures() }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-[492px] min-w-[266px]">
        <Link
          to={to}
          className="w-full h-full flex flex-col items-center justify-center mx-auto sm:mx-[initial] space-y-6 cursor-pointer bg-chessBlack-300 rounded-xl ease-in-out duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.05] hover:no-underline"
        >
          <Icon name="treasure_chess" color="#ffffff" height="60px" />
          <h3 className="font-semibold text-grey">{t('See More')}</h3>
        </Link>
      </div>
    </div>
  )
}

export default SeeMore
