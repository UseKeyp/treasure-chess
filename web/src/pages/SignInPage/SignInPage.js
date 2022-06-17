import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

import LoginPortal from 'src/components/LoginPortal'
import { useTheme } from 'src/providers/theme'

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
