import FaqSection from 'src/components/FaqSection/FaqSection'
import { MetaTags } from '@redwoodjs/web'
import FeaturedPlayers from 'src/components/FeaturedPlayers/FeaturedPlayers'
import LandingPageBoxes from 'src/components/Landingpageboxes/LandingPageBoxes'
import HomePageHero from 'src/components/HomePageHero/HomePageHero'
import HeadingBar from 'src/components/HeadingBar/HeadingBar'
import AllTreasuresButton from 'src/components/AllTreasuresButton/AllTreasuresButton'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import { useAuth } from '@redwoodjs/auth'

const HomePage = () => {
  const { currentUser } = useAuth()

  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          portalId: '24364914',
          formId: 'abfbec57-701f-49ca-867a-9dbc0b9670e7',
          target: '#hubspotForm',
        })
      }
    })
  }, [])

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
      <div className="mt-6 p-4 mb-20 lg:mb-0 md:mb-20 sm:mb-20 rounded-lg bg-chessBlack-100">
        <div id="hubspotForm"></div>
      </div>
    </>
  )
}

export default HomePage
