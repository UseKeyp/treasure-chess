import { Set, Router, Route, Private } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout'
import LoadingCards from 'src/components/LoadingCards'
import AppUrlListener from './utils/AppUrlListener'
import AllContextProviders from 'src/providers'
import HomepageLayout from 'src/layouts/HomepageLayout/HomepageLayout'
import NoBackgroundLayout from 'src/layouts/NoBackgroundLayout/NoBackgroundLayout'

const Routes = () => {
  return (
    <Router>
      <AllContextProviders>
        <AppUrlListener />
        <Route path="/wert" page={WertPage} name="wert" />
        <Route path="/restricted" page={RestrictedPage} name="restricted" />
        <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
        <Route path="/redirect/{type}/{error}" page={RedirectPage} name="redirect" />
        <Set wrap={HomepageLayout} whileLoadingPage={() => <LoadingCards />}>
          <Route path="/" page={HomePage} name="home" />
        </Set>
        <Set wrap={NoBackgroundLayout} whileLoadingPage={() => <LoadingCards />}>
          <Private unauthenticated="signin" whileLoadingAuth={() => <LoadingCards />}>
            <Route path="/profile" page={ProfilePage} name="profile" />
          </Private>
          <Route path="/members/{usernameOrAddress}" page={MemberMemberPage} name="member" />
          <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
          <Route path="/treasures/{tokenId:String}" page={TreasureTreasurePage} name="treasure" />
        </Set>
        <Set wrap={DefaultLayout} whileLoadingPage={() => <LoadingCards />}>
          <Route path="/subscribe" page={SubscribePage} name="subscribe" />
          <Route path="/terms" page={TermsPage} name="terms" />
          <Route path="/privacy" page={PrivacyPage} name="privacy" />
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/signin" page={SignInPage} name="signin" />
          <Route notfound page={NotFoundPage} />
          <Private unauthenticated="signin" whileLoadingAuth={() => <LoadingCards />}>
            <Route path="/wallet" page={WalletPage} name="wallet" />
            <Route path="/settings" page={SettingsPage} name="settings" />
          </Private>
          <Route path="/chain-data" page={ChainDataPage} name="chainData" />
          <Route path="/support" page={SupportPage} name="support" />
        </Set>
      </AllContextProviders>
    </Router>
  )
}

export default Routes
