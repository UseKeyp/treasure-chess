import Icon from 'src/components/Icon'
import globalConfig from 'src/global.config.js'

const SiteFooter = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-7xl flex-1 flex flex-col items-center justify-between py-12 px-4 text-sm md:flex-row">
        <div className="flex items-center mt-4 md:mt-0">
          <a href={globalConfig.DISCORD_URL} className="inline-block mr-4">
            <Icon name="discord" size="24px" />
            <span className="sr-only">discord</span>
          </a>
          <a href={globalConfig.GITHUB_URL} className="inline-block mr-4">
            <Icon name="github" size="24px" />
            <span className="sr-only">Github</span>
          </a>
          <a href={globalConfig.BLOG_URL} className="inline-block mr-4">
            Blog
          </a>
        </div>
        <div className="text-center mt-4 md:mt-0">
          <a href={globalConfig.TOC_URL} className="inline-block mr-4">
            Terms of Service
          </a>
          <a
            href={globalConfig.PRIVACY_POLICY_URL}
            className="inline-block mr-4"
          >
            Privacy Policy
          </a>
          <a href={globalConfig.SUPPORT_URL} className="inline-block mr-4">
            Support
          </a>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <a href={globalConfig.CHESS_COM_BASE_URL} className="mr-4">
            <Icon name="chess_com" height="25" />
            <span className="sr-only">Chess.com</span>
          </a>
          <div className="mr-4">© Nifty Chess, Inc. {currentYear}</div>
          <div>{process.env.VERSION}</div>
        </div>
      </div>
    </div>
  )
}

export default SiteFooter
