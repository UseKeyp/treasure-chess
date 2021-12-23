import { GamesContextProvider } from 'src/providers/games'
import { MintingProvider } from 'src/providers/minting'
import { WalletProvider } from 'src/providers/wallet'
import { ThemeContextProvider } from 'src/providers/theme'
import { TokenSessionProvider } from 'src/providers/tokenSession'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <ThemeContextProvider>
      <GamesContextProvider>
        <TokenSessionProvider />
        <WalletProvider>
          <MintingProvider>{children}</MintingProvider>
        </WalletProvider>
      </GamesContextProvider>
    </ThemeContextProvider>
  )
}

export default AllContextProviders
