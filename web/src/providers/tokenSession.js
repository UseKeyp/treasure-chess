import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { deleteJwt } from 'src/auth/helpers'

const TokenSessionProvider = () => {
  const { userMetadata, currentUser, loading } = useAuth()

  // TODO: Implement redirectTo before sending to loginPage
  React.useEffect(() => {
    console.log(window.location.pathname)
  }, [])

  React.useEffect(() => {
    if (loading) return
    console.log({ currentUser })
    console.log({ userMetadata })
    if (!currentUser && userMetadata) {
      // TODO: uncomment
      // deleteJwt() // Prevent repeated login redirects
      navigate(routes.login({ error: 'expired', redirectTo: '' }))
    }
    if (currentUser?.jwt) saveJwt(jwt) // Only included if refreshed
  }, [currentUser, userMetadata, loading])
  return <></>
}

export default TokenSessionProvider
