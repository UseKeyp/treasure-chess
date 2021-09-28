import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { deleteJwt } from 'src/auth/helpers'

const TokenSessionProvider = () => {
  const { userMetadata, currentUser, loading } = useAuth()

  React.useEffect(() => {
    if (loading) return
    console.log({ currentUser })
    console.log({ userMetadata })
    if (!currentUser && userMetadata) {
      const redirectTo = window.location.pathname
      // TODO: uncomment
      // deleteJwt() // Prevent repeated login redirects
      navigate(
        routes.login({
          error: 'expired',
          ...(redirectTo !== '/' && { redirectTo }),
        })
      )
    }
    if (currentUser?.jwt) saveJwt(jwt) // Only included if refreshed
  }, [currentUser, userMetadata, loading])
  return <></>
}

export default TokenSessionProvider
