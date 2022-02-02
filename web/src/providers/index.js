import { GamesContextProvider } from 'src/providers/games'
import { MintingProvider } from 'src/providers/minting'
import { WalletProvider } from 'src/providers/wallet'
import { ThemeContextProvider } from 'src/providers/theme'
import { TokenSessionProvider } from 'src/providers/tokenSession'
import { ToastProvider } from 'src/providers/toast'
import { FilterProvider } from './filters'
import { RestrictedProvider } from './restricted'
import { MarketProvider } from './market'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <RestrictedProvider>
      <ThemeContextProvider>
        <FilterProvider>
          <ToastProvider>
            <GamesContextProvider>
              <TokenSessionProvider />
              <WalletProvider>
                <MintingProvider>
                  <MarketProvider>{children}</MarketProvider>
                </MintingProvider>
              </WalletProvider>
            </GamesContextProvider>
          </ToastProvider>
        </FilterProvider>
      </ThemeContextProvider>
    </RestrictedProvider>
  )
}

export default AllContextProviders
