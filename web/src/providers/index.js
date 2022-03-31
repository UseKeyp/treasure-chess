import { GamesContextProvider } from 'src/providers/games'
import { MintingProvider } from 'src/providers/minting'
import { WalletProvider } from 'src/providers/wallet'
import { ThemeContextProvider } from 'src/providers/theme'
import { TokenSessionProvider } from 'src/providers/tokenSession'
import { ToastProvider } from 'src/providers/toast'
import { FilterProvider } from './filters'
import { RestrictedProvider } from './restricted'
import { MarketProvider } from './market'
import { RampProvider } from './ramp'
import { LocaleProvider } from './locale/locale'
import { OAuthProvider } from './oAuth/oAuth'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <RestrictedProvider>
      <LocaleProvider>
        <ThemeContextProvider>
          <FilterProvider>
            <ToastProvider>
              <GamesContextProvider>
                <TokenSessionProvider />
                <OAuthProvider>
                  <RampProvider>
                    <WalletProvider>
                      <MintingProvider>
                        <MarketProvider>{children}</MarketProvider>
                      </MintingProvider>
                    </WalletProvider>
                  </RampProvider>
                </OAuthProvider>
              </GamesContextProvider>
            </ToastProvider>
          </FilterProvider>
        </ThemeContextProvider>
      </LocaleProvider>
    </RestrictedProvider>
  )
}

export default AllContextProviders
