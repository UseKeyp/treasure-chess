import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'
import UserBalanceCell from 'src/components/UserBalanceCell/UserBalanceCell'
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
