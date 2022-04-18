import { Set, Router, Route, Private } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/restricted" page={RestrictedPage} name="restricted" />
      <Route path="/redirect/{type}" page={RedirectPage} name="redirect" prerender />
      <Route path="/redirect/{type}/{error}" page={RedirectPage} name="redirect" prerender />
      <Set wrap={DefaultLayout} prerender>
        <Route path="/privacy" page={PrivacyPage} name="privacy" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={FaqPage} name="faq" />
        <Route path="/feedback" page={FeedbackPage} name="feedback" />
        <Route path="/signin" page={SignInPage} name="signin" />
        <Route notfound page={NotFoundPage} />
        <Route path="/members/{usernameOrAddress}" page={MemberMemberPage} name="member" />
        <Private unauthenticated="signin">
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
