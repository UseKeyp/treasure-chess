import FaqSection from 'src/components/FaqSection/FaqSection'
import UserBalanceCell from 'src/components/UserBalanceCell/UserBalanceCell'
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
      <UserBalanceCell />
    </>
  )
}

export default HomePage
