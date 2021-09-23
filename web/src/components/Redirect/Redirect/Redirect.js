import { useMutation } from '@redwoodjs/web'
import { routes, navigate, useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

import { LOCAL_TOKEN_KEY } from 'src/auth/constants'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'

export const OAUTH_CODE_GRANT_MUTATION = gql`
  mutation OauthCodeGrantMutation(
    $type: String!
    $state: String!
    $code: String!
  ) {
    oauthCodeGrant(state: $state, code: $code, type: $type) {
      jwt
    }
  }
`

const Redirect = ({ type }) => {
  const [errorMessage, setErrorMessage] = React.useState()
  const { code, state, redirectTo } = useParams()
  const [codeGrantMutation, { error: mutationError, data }] = useMutation(
    OAUTH_CODE_GRANT_MUTATION
  )
  const { logIn } = useAuth()

  const checkValidParams = () => {
    if (!code || !state) setErrorMessage('Invalid redirect parameters')
  }

  const submitOauthCodeGrant = async () => {
    const res = await codeGrantMutation({
      variables: {
        type: 'chess',
        code,
        state,
      },
    })
    if (res?.data?.oauthCodeGrant) {
      localStorage.setItem(LOCAL_TOKEN_KEY, res.data.oauthCodeGrant.jwt)
      window.location.href = redirectTo || '/'
    }
  }

  React.useEffect(() => {
    checkValidParams()
    submitOauthCodeGrant()
  }, [])

  if (mutationError || errorMessage)
    return (
      <DefaultLayout>
        <div className="mt-8 sm:text-center lg:text-left">
          <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            ⛈️ Oops! Something went wrong
          </h1>
          <div className=" mt-8 rw-cell-error">
            {(mutationError?.message || errorMessage).substring(0, 200)}
          </div>
          <button onClick={logIn}>
            <p className="mt-8 text-s text-grey-600">
              <b>Try again</b>
            </p>
          </button>
        </div>
      </DefaultLayout>
    )
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Redirect
