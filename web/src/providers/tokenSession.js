import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

const TokenSessionProvider = () => {
  const { userMetadata, currentUser, loading } = useAuth()

  React.useEffect(() => {
    if (loading) return
    console.log({ currentUser })
    console.log({ userMetadata })
    if (!currentUser && userMetadata) {
      const redirectTo = window.location.pathname
      navigate(
        routes.login({
          error: 'expired',
          ...(redirectTo !== '/' && { redirectTo }),
        })
      )
    }
  }, [currentUser, userMetadata, loading])
  return <></>
}

export default TokenSessionProvider
