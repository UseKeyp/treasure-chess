import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Treasure Chess</title>
      </Head>
      <h1 className="font-bold">Treasure Chess</h1>
      <HomePageHero />
      <FaqSection />
    </>
  )
}

export default HomePage
