import { Set, Router, Route, Private } from '@redwoodjs/router'
import MembersLayout from 'src/layouts/MembersLayout'
import TreasuresLayout from 'src/layouts/TreasuresLayout'
import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={FaqPage} name="faq" />
        <Route path="/login" page={LoginPage} name="login" />
        <Set wrap={MembersLayout}>
          <Route path="/members/{usernameOrAddress}" page={MemberMemberPage} name="member" />
          <Private unauthenticated="login">
            <Route path="/profile" page={ProfilePage} name="profile" />
          </Private>
        </Set>
        <Set wrap={TreasuresLayout}>
          <Route path="/treasures/{tokenId:Int}" page={TreasureTreasurePage} name="treasure" />
          <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
