import { Link, routes } from '@redwoodjs/router'

import Icon from 'src/components/Icon'
import globalConfig from 'src/global.config.js'

const SiteFooter = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className="w-full flex justify-center items-center bg-chessBlack-200 mb-12 sm:mb-0 mt-12">
      <div className="max-w-7xl flex-1 flex flex-col items-center justify-between py-5 px-4 text-sm md:flex-row">
        <div className="flex items-center mt-4 md:mt-0 flex-col sm:flex-row">
          <div className="flex items-center">
            <a href={globalConfig.DISCORD_URL} className="inline-block mr-4">
              <Icon name="discord" size="24px" />
              <span className="sr-only">discord</span>
            </a>
            <a href={globalConfig.TWITTER_URL} className="inline-block mr-4">
              <Icon name="twitter" color="#fff" size="24px" />
              <span className="sr-only">twitter</span>
            </a>
            <a href={globalConfig.GITHUB_URL} className="inline-block mr-4">
              <Icon name="github" size="24px" />
              <span className="sr-only">Github</span>
            </a>
          </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row text-center mt-4 sm:my-2 sm:space-x-6 space-y-2 sm:space-y-0">
          <a href={globalConfig.BLOG_URL}>Blog</a>
          <Link to={routes.terms()}>Terms</Link>
          <Link to={routes.privacy()}>Privacy</Link>
          <Link to={routes.support()}>Support</Link>
          <Link to={routes.feedback()}>Feedback</Link>
        </div>
        <div className="flex items-center flex-row space-x-4 mt-2 space-y-2 ">
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
