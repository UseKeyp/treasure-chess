import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomePageHero />
      <LandingPageBoxes />
      <FaqSection />
    </>
  )
}

export default HomePage
