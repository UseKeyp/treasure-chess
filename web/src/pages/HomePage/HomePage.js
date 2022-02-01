import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'
import FeaturedPlayers from 'src/components/FeaturedPlayers/FeaturedPlayers'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* TODO: remaining home page content */}
      <HomePageHero />
      <LandingPageBoxes />
      <FeaturedPlayers />
      <FaqSection />
    </>
  )
}

export default HomePage
