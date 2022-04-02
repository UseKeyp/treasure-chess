import LoginPortal from 'src/components/LoginPortal'
import { MetaTags } from '@redwoodjs/web'

const SignInPage = () => {
  return (
    <>
      <MetaTags title="Sign In" description="Create a Treasure Chess wallet" />
      <LoginPortal />
    </>
  )
}

export default SignInPage
