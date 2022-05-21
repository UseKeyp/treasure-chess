import { MetaTags } from '@redwoodjs/web'
import Section from 'src/components/Section/Section'
import WalletFormTransfer20 from 'src/components/Wallet/WalletFormTransfer20/WalletFormTransfer20'
import WalletFormTransfer721 from 'src/components/Wallet/WalletFormTransfer721/WalletFormTransfer721'

const WalletPage = () => {
  return (
    <>
      <MetaTags title="Wallet" description="Interact with your wallet" />
      <h1>Wallet</h1>
      <div className="transfer-container">
        <Section>
          <h1>Transfer ERC20</h1>
          <WalletFormTransfer20 />
        </Section>
        <Section>
          <h1>Transfer ERC721</h1>
          <WalletFormTransfer721 />
        </Section>
      </div>
    </>
  )
}

export default WalletPage
