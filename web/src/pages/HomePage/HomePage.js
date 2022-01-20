import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import TreasureYourChess from 'src/components/TreasureYourChess/TreasureYourChess'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Treasure Chess</title>
      </Head>
      <h1 className="font-bold">Treasure Chess</h1>
      <TreasureYourChess />
      <LandingPageBoxes />
      <FaqSection />
    </>
  )
}

export default HomePage
