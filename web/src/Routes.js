import { Set, Router, Route, Private } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout'
// import Loader from 'src/components/Loader'

const Routes = () => {
  return (
    <Router>
      <Route path="/restricted" page={RestrictedPage} name="restricted" />
      <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
      <Route path="/redirect/{type}/{error}" page={RedirectPage} name="redirect" />
      <Set wrap={DefaultLayout}>
        <Route path="/terms" page={TermsPage} name="terms" />
        <Route path="/privacy" page={PrivacyPage} name="privacy" />
        <Route path="/" page={HomePage} name="home" />
        {/*<Route path="/wallet" page={WalletPage} name="wallet" />*/}
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/feedback" page={FeedbackPage} name="feedback" />
        <Route path="/signin" page={SignInPage} name="signin" />
        <Route notfound page={NotFoundPage} />
        <Route path="/members/{usernameOrAddress}" page={MemberMemberPage} name="member" />
        <Private unauthenticated="signin">
          {/*    <Private unauthenticated="signin" whileLoadingAuth={Loader}> */}
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Private>
        <Route path="/treasures/{tokenId:String}" page={TreasureTreasurePage} name="treasure" />
        <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
        <Route path="/chain-data" page={ChainDataPage} name="chainData" />
      </Set>
    </Router>
  )
}

export default Routes
