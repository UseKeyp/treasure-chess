import { MetaTags } from '@redwoodjs/web'
import Wallet from 'src/components/Wallet/Wallet'
import { useTheme } from 'src/providers/theme'
import { useEffect } from 'react'

const WalletPage = () => {
  const { toggleFaqTheme } = useTheme()

  useEffect(() => {
    toggleFaqTheme(true)
    return function cleanup() {
      toggleFaqTheme(false)
    }
  })
  return (
    <>
      <MetaTags title="Wallet" description="Add funds or cash out." />
      <Wallet />
    </>
  )
}

export default WalletPage
