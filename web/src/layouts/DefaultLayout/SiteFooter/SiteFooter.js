import { ReactComponent as Discord } from 'src/assets/icons/discord.svg'
import { ReactComponent as ChessCom } from 'src/assets/icons/chess.com.svg'

const SiteFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-6xl flex-1 flex flex-col-reverse items-center justify-between py-12 px-4 text-sm md:flex-row">
        <div className="flex items-center mt-4 md:mt-0">
          <a href="/" className="inline-block mr-4">
            <Discord />
            <span className="sr-only">discord</span>
          </a>
          <a href="/" className="inline-block mr-4">
            Blog
          </a>
        </div>
        <div className="text-center mt-4 md:mt-0">
          <a href="/" className="inline-block mr-4">
            Terms of Service
          </a>
          <a href="/" className="inline-block mr-4">
            Privacy Policy
          </a>
          <a href="/" className="inline-block mr-4">
            Support
          </a>
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <div className="mr-4">
            <ChessCom />
          </div>
          <div className="mt-4 md:mt-0">{currentYear} Nifty Chess, Inc.</div>
        </div>
      </div>
    </div>
  )
}

export default SiteFooter
