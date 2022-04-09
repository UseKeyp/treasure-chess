import Redirect from 'src/components/Redirect'
import { MetaTags } from '@redwoodjs/web'

const RedirectPage = ({ type, error }) => {
  return (
    <>
      <MetaTags title="Redirect" />
      <Redirect type={type} error={error} />
    </>
  )
}

export default RedirectPage
