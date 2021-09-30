import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { deleteJwt, saveJwt } from 'src/auth/helpers'

const TokenSessionProvider = () => {
  const { userMetadata, currentUser, loading } = useAuth()

  React.useEffect(() => {
    if (loading) return
    // TODO: remove logs
    console.log({ currentUser })
    console.log({ userMetadata })
    if (!currentUser && userMetadata) {
      const redirectTo = window.location.pathname
      // deleteJwt() // Prevent repeated login redirects
      navigate(
        routes.login({
          error: 'expired',
          ...(redirectTo !== '/' && { redirectTo }),
        })
      )
    }
    if (currentUser?.jwt) saveJwt(currentUser.jwt) // Only included if refreshed
  }, [currentUser, userMetadata, loading])
  return <></>
}

export default TokenSessionProvider
