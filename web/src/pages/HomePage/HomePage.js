import FaqSection from 'src/components/FaqSection/FaqSection'
import Button from 'src/components/Button/Button'
import HeaderBar from 'src/components/HeaderBar/HeaderBar'
import { Head } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Treasure Chess</title>
      </Head>
      <h1 className="font-bold">Treasure Chess</h1>
      {/* TODO: remaining home page content */}
      <FaqSection />
      <HeaderBar text="Featured Players" />

      <HeaderBar text="Featured Players" justifyChildren="left">
        <Button>hello</Button>
      </HeaderBar>

      <HeaderBar text="Featured Players" justifyChildren="right">
        <Button>hello</Button>
      </HeaderBar>

      <HeaderBar type="small" text="Featured Players" justifyChildren="right">
        <Button>hello</Button>
      </HeaderBar>
    </>
  )
}

export default HomePage
