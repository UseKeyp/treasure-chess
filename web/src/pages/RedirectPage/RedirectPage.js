import Redirect from 'src/components/Redirect'

const RedirectPage = ({ type, error }) => {
  return <Redirect type={type} error={error} />
}

export default RedirectPage
