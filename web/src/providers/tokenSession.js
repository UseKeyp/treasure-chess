import { useAuth } from '@redwoodjs/auth'

const TokenSessionProvider = () => {
  const { userMetadata, currentUser, loading } = useAuth()

  React.useEffect(() => {
    // TODO: Implement session handling (if necessary for dbAuth)
    // if (loading) return
    // if (!currentUser && userMetadata) {
    //   const redirectTo = window.location.pathname
    //   navigate(
    //     routes.login({
    //       error: 'expired',
    //       ...(redirectTo !== '/' && { redirectTo }),
    //     })
    //   )
    // }
  }, [currentUser, userMetadata, loading])
  return <></>
}

export default TokenSessionProvider
