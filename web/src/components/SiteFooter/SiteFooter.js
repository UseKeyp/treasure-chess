import { Link, routes } from '@redwoodjs/router'

import Icon from 'src/components/Icon'
import globalConfig from 'src/global.config.js'

const SiteFooter = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className="w-full flex justify-center items-center bg-chessBlack-200 pb-20 md:py-10 pt-10  mt-12">
      <div className="max-w-7xl flex-1 flex flex-col items-center justify-between px-2 md:px-8 text-sm md:flex-row space-y-6 md:space-y-0">
        <div className="flex items-center space-x-6">
          <a href={globalConfig.DISCORD_URL}>
            <Icon name="discord" size="24px" />
            <span className="sr-only">discord</span>
          </a>
          <a href={globalConfig.TWITTER_URL}>
            <Icon name="twitter" color="#fff" size="24px" />
            <span className="sr-only">twitter</span>
          </a>
          <a href={globalConfig.GITHUB_URL}>
            <Icon name="github" size="24px" />
            <span className="sr-only">Github</span>
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <a className="underline" href={globalConfig.BLOG_URL}>
            Blog
          </a>
          <Link className="underline" to={routes.terms()}>
            Terms
          </Link>
          <Link className="underline" to={routes.privacy()}>
            Privacy
          </Link>
          <Link className="underline" to={routes.support()}>
            Support
          </Link>
        </div>
        <div className="flex items-center  space-x-4">
          <a href={globalConfig.CHESS_COM_BASE_URL}>
            <Icon name="chess_com" height="25" />
            <span className="sr-only">Chess.com</span>
          </a>
          <div>© Nifty Chess, Inc. {currentYear}</div>
          <div>{process.env.VERSION}</div>
        </div>
      </div>
    </div>
  )
}

export default SiteFooter
