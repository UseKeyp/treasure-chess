import LoginPortal from 'src/components/LoginPortal'
import { MetaTags } from '@redwoodjs/web'

import { useTheme } from 'src/providers/theme'
import { useEffect } from 'react'

const SignInPage = () => {
  const { toggleFaqTheme } = useTheme()

  useEffect(() => {
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
