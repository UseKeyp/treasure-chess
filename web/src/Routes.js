import { Set, Router, Route } from '@redwoodjs/router'
import MembersLayout from 'src/layouts/MembersLayout'
import TreasuresLayout from 'src/layouts/TreasuresLayout'
import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/faq" page={FaqPage} name="faq" />
        <Set wrap={MembersLayout}>
          <Route path="/members/{id}" page={MemberMemberPage} name="member" />
        </Set>
        <Set wrap={TreasuresLayout}>
          <Route path="/treasures/{id}" page={TreasureTreasurePage} name="treasure" />
          <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
