import { GamesContextProvider } from 'src/providers/games'
import { MintingProvider } from 'src/providers/minting'
import { WalletProvider } from 'src/providers/wallet'
import { ThemeContextProvider } from 'src/providers/theme'
import { ToastProvider } from 'src/providers/toast'
import { FilterProvider } from './filters'
import { RestrictedProvider } from './restricted'
import { MarketProvider } from './market'
import { RampProvider } from './ramp'
import { LocaleProvider } from './locale'
import { OAuthProvider } from './oAuth'
import { RedirectionProvider } from './redirection'
import { TrackingProvider } from './tracking'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <>
      <RestrictedProvider>
        <TrackingProvider />
        <LocaleProvider>
          <ThemeContextProvider>
            <FilterProvider>
              <ToastProvider>
                <OAuthProvider>
                  <RedirectionProvider>
                    <WalletProvider>
                      <RampProvider>
                        <GamesContextProvider>
                          <MintingProvider>
                            <MarketProvider>{children}</MarketProvider>
                          </MintingProvider>
                        </GamesContextProvider>
                      </RampProvider>
                    </WalletProvider>
                  </RedirectionProvider>
                </OAuthProvider>
              </ToastProvider>
            </FilterProvider>
          </ThemeContextProvider>
        </LocaleProvider>
      </RestrictedProvider>
    </>
  )
}

export default AllContextProviders
