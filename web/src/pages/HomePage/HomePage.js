import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'
import FeaturedPlayers from 'src/components/FeaturedPlayers/FeaturedPlayers'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Treasure Chess</title>
      </Head>
      <h1 className="font-bold">Treasure Chess</h1>
      <FeaturedPlayers />
      <FaqSection />
    </>
  )
}

export default HomePage
