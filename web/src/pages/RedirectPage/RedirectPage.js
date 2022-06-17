import { MetaTags } from '@redwoodjs/web'

import Redirect from 'src/components/Redirect'

const RedirectPage = ({ type, error }) => {
  return (
    <>
      <MetaTags title="Redirect" />
      <Redirect type={type} error={error} />
    </>
  )
}

export default RedirectPage
