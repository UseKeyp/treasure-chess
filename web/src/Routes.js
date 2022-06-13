import { Set, Router, Route, Private } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import AppUrlListener from './utils/AppUrlListener'
import AllContextProviders from 'src/providers'

const Routes = () => {
  return (
    <Router whileLoadingPage={() => <Loader />}>
      <AllContextProviders>
        <AppUrlListener />
        <Route path="/restricted" page={RestrictedPage} name="restricted" />
        <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
        <Route path="/redirect/{type}/{error}" page={RedirectPage} name="redirect" />
        <Set wrap={DefaultLayout}>
          <Route path="/subscribe" page={SubscribePage} name="subscribe" />
          <Route path="/terms" page={TermsPage} name="terms" />
          <Route path="/privacy" page={PrivacyPage} name="privacy" />
          <Route path="/" page={HomePage} name="home" />
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/signin" page={SignInPage} name="signin" />
          <Route notfound page={NotFoundPage} />
          <Route path="/members/{usernameOrAddress}" page={MemberMemberPage} name="member" />
          <Private unauthenticated="signin" whileLoadingAuth={() => <Loader />}>
            <Route path="/wallet" page={WalletPage} name="wallet" />
            <Route path="/settings" page={SettingsPage} name="settings" />
            <Route path="/profile" page={ProfilePage} name="profile" />
          </Private>
          <Route path="/treasures/{tokenId:String}" page={TreasureTreasurePage} name="treasure" />
          <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
          <Route path="/chain-data" page={ChainDataPage} name="chainData" />
          <Route path="/support" page={SupportPage} name="support" />
        </Set>
      </AllContextProviders>
    </Router>
  )
}

export default Routes
