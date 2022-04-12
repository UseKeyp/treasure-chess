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
      <LandingPageBoxes />
      <FeaturedPlayers />
      <HeadingBar text="Newest Treasures">
        <AllTreasuresButton />
      </HeadingBar>
      <TreasuresFetcher sort="Newest First" />
      <FaqSection />
    </>
  )
}

export default HomePage
