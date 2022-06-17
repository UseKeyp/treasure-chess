import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import FeaturedPlayers from 'src/components/FeaturedPlayers/FeaturedPlayers'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'
import HeadingBar from 'src/components/HeadingBar/HeadingBar'
import AllTreasuresButton from 'src/components/AllTreasuresButton/AllTreasuresButton'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import { useTheme } from 'src/providers/theme'
import { useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'

const HomePage = () => {
  const { toggleFaqTheme } = useTheme()
  const { currentUser } = useAuth()

  useEffect(() => {
    toggleFaqTheme(true)
    return function cleanup() {
      toggleFaqTheme(false)
    }
  })

  return (
    <>
      <MetaTags title="Play, Create, Collect" />
      {/* TODO: remaining home page content */}
      <HomePageHero />
      <div className="mt-16">
        <HeadingBar text={t('Newest Treasures')}>
          <AllTreasuresButton />
        </HeadingBar>
      </div>
      <TreasuresFetcher limit sort="Newest First" />
      <div className="mt-24">
        <LandingPageBoxes />
      </div>
      <FeaturedPlayers />
      <FaqSection />
      <h2 className="mt-24">Subscribe to Updates</h2>
      <div className="mt-6 p-4 rounded-lg bg-chessBlack-100 ">
        <div className="">
          <iframe
            src={`https://mautic.tools.treasurechess.com/form/1?username=${currentUser?.username}`}
            className="max-w-[500px] w-full"
            height="175"
            title="Subscribe form"
            scrolling="no"
            frameBorder="0"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      </div>
    </>
  )
}

export default HomePage
