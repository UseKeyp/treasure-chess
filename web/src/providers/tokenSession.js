import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { deleteJwt } from 'src/auth/helpers'

const TokenSessionProvider = () => {
  const { userMetadata, currentUser, loading } = useAuth()
  React.useEffect(() => {
    if (loading) return
    if (!currentUser && userMetadata) {
      deleteJwt() // Prevent repeated login requests
      navigate(routes.login({ error: 'expired' }))
    }
    if (currentUser?.jwt) saveJwt(jwt) // Only included if refreshed
  }, [currentUser, userMetadata, loading])
  return <></>
}

export default TokenSessionProvider
