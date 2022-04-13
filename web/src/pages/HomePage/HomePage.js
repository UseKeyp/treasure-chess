import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import FeaturedPlayers from 'src/components/FeaturedPlayers/FeaturedPlayers'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'
import HeadingBar from 'src/components/HeadingBar/HeadingBar'
import AllTreasuresButton from 'src/components/AllTreasuresButton/AllTreasuresButton'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Play, Create, Collect" />
      {/* TODO: remaining home page content */}
      <HomePageHero />
      <div className="mt-24">
        <LandingPageBoxes />
      </div>
      <FeaturedPlayers />
      <div className="mt-16">
        <HeadingBar text="Newest Treasures">
          <AllTreasuresButton />
        </HeadingBar>
      </div>
      <TreasuresFetcher sort="Newest First" />
      <FaqSection />
    </>
  )
}

export default HomePage
