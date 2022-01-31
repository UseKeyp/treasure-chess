import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'
import FeaturedPlayers from 'src/components/FeaturedPlayers/FeaturedPlayers'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'


const HomePage = () => {
  return (
    <>
      <Head>
        <title>Treasure Chess</title>
      </Head>
      <h1 className="font-bold">Treasure Chess</h1>
      {/* TODO: remaining home page content */}
      <HomePageHero />
      <LandingPageBoxes />
      <FeaturedPlayers />  
      <FaqSection />
    </>
  )
}

export default HomePage
