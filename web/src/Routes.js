import { Set, Router, Route, Private } from '@redwoodjs/router'
import TreasuresLayout from 'src/layouts/TreasuresLayout'
import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/restricted" page={RestrictedPage} name="restricted" />
      <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
      <Route path="/redirect/{type}/{error}" page={RedirectPage} name="redirect" />
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={FaqPage} name="faq" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route notfound page={NotFoundPage} />
        <Route path="/members/{usernameOrAddress}" page={MemberMemberPage} name="member" />
        <Private unauthenticated="login">
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Private>
        <Set wrap={TreasuresLayout}>
          <Route path="/treasures/{tokenId:String}" page={TreasureTreasurePage} name="treasure" />
          <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
        </Set>
        <Route path="/chain-data" page={ChainDataPage} name="chainData" />
        <Route path="/wallet" page={WalletPage} name="wallet" />
      </Set>
    </Router>
  )
}

export default Routes
