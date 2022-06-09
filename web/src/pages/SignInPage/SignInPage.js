import LoginPortal from 'src/components/LoginPortal'
import { MetaTags } from '@redwoodjs/web'
import { useTheme } from 'src/providers/theme'

const SignInPage = () => {
  const { toggleFaqTheme } = useTheme()

  React.useEffect(() => {
    toggleFaqTheme(true)
    return function cleanup() {
      toggleFaqTheme(false)
    }
  })

  return (
    <>
      <MetaTags title="Sign In" description="Join to start collecting." />
      <LoginPortal />
    </>
  )
}

export default SignInPage
