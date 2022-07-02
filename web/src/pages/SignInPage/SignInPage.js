import LoginPortal from 'src/components/LoginPortal'
import { MetaTags } from '@redwoodjs/web'

const SignInPage = () => {
  return (
    <>
      <MetaTags title="Sign In" description="Join to start collecting." />
      <LoginPortal />
    </>
  )
}

export default SignInPage
