import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import FeaturedPlayers from 'src/components/FeaturedPlayers/FeaturedPlayers'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'
import RecentlyListed from 'src/components/RecentlyListed/RecentlyListed'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Play, Create, Collect" />
      {/* TODO: remaining home page content */}
      <HomePageHero />
      <LandingPageBoxes />
      <FeaturedPlayers />
      <RecentlyListed />
      <FaqSection />
    </>
  )
}

export default HomePage
