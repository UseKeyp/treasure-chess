import { Link, routes } from '@redwoodjs/router'
import Redirect from 'src/components/Redirect/Redirect'

const RedirectPage = ({ type }) => {
  return (
    <>
      <Redirect type={type} />
    </>
  )
}

export default RedirectPage
