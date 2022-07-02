import { MetaTags } from '@redwoodjs/web'
import Wallet from 'src/components/Wallet/Wallet'

const WalletPage = () => {
  return (
    <>
      <MetaTags title="Wallet" description="Add funds or cash out." />
      <Wallet />
    </>
  )
}

export default WalletPage
