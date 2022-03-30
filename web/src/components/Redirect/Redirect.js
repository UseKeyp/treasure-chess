import { useMutation } from '@apollo/client'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { getRedirectTo } from 'src/utils/auth/helpers'

import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import SiteFooter from 'src/components/SiteFooter'

import { OAUTH_CODE_GRANT_MUTATION } from './graphql'

const Redirect = ({ type }) => {
  const [state, setState] = React.useState({ isLoading: true })

  const { code, state: grantState, orderId, error } = useParams()
  const { reauthenticate } = useAuth()

  const [codeGrant] = useMutation(OAUTH_CODE_GRANT_MUTATION)

  // ###############  Chess.com  ################
  const submitLoginCodeGrant = async () => {
    const errorIcon = (
      <div className="flex align-center bg-black p-4 rounded-lg border-2 border-red">
        <Icon name="chess_com" size="29" />
      </div>
    )
    const loginCallToAction = (
      <Button
        to={routes.login()}
        className="text-s mt-6"
        size="large"
        color="green"
      >
        Try again
      </Button>
    )
    if (!code || !grantState)
      return setState({
        isLoading: false,
        errorMessage: 'Invalid redirect parameters',
        callToAction: loginCallToAction,
        errorIcon,
      })
    /* eslint-disable-next-line no-undef */
    const response = await fetch(global.RWJS_API_DBAUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state: grantState, method: 'login' }),
    }).then((res) => {
      return res.json()
    })
    if (response.error || !response)
      return setState({
        isLoading: false,
        errorMessage: response.error || 'Something went wrong',
        callToAction: loginCallToAction,
        errorIcon,
      })
    if (response.id) {
      await reauthenticate()
      navigate(getRedirectTo() || '/')
    }
  }

  // ###############  General oAuth  ################
  const submitCodeGrant = async () => {
    const errorIcon = (
      <div className="flex align-center bg-black p-4 rounded-lg border-2 border-red">
        <Icon name={type} size="29" height="29" color="white" />
      </div>
    )
    const successIcon = (
      <div className="flex align-center bg-black p-4 rounded-lg border-2 border-green">
        <Icon name={type} size="29" height="29" color="white" />
      </div>
    )
    try {
      if (!code || !grantState)
        return setState({
          isLoading: false,
          errorMessage: 'Invalid redirect parameters',
          errorIcon,
        })
      /* eslint-disable-next-line no-undef */
      const {
        data: { codeGrant: codeGrantData },
      } = await codeGrant({
        variables: {
          type,
          code,
          state: grantState,
        },
        fetchPolicy: 'network-only',
      })
      if (codeGrantData.status === 'SUCCESS') {
        setState({
          isLoading: false,
          successMessage: 'Great - connection complete!',
          successIcon,
        })
      } else {
        setState({
          isLoading: false,
          errorMessage: 'Something went wrong',
          errorIcon,
        })
      }
    } catch (error) {
      setState({ isLoading: false, errorMessage: error.message, errorIcon })
    }
  }

  // ###############  Wyre  #####################
  const completeWyreOrder = async () => {
    const errorIcon = (
      <div className="flex align-center bg-black p-4 rounded-lg border-2 border-red">
        <Icon name="wyre" size="29" />
      </div>
    )
    const successIcon = (
      <div className="flex align-center bg-black p-4 rounded-lg border-2 border-green">
        <Icon name="wyre" size="29" color="green" />
      </div>
    )
    if (!orderId || error)
      return setState({
        isLoading: false,
        errorMessage: 'Wyre checkout failed',
        errorIcon,
      })
    setState({
      isLoading: false,
      orderSubmitted: true,
      successIcon,
      successMessage: 'Great - payment complete!',
    })
  }

  React.useEffect(() => {
    if (type === 'chess') {
      submitLoginCodeGrant()
    } else if (type === 'wyre') {
      completeWyreOrder(type)
    } else {
      submitCodeGrant()
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [code, grantState, type])

  let contents = null
  if (state.isLoading)
    return (
      <div className="min-w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )

  if (state.errorMessage) {
    contents = (
      <>
        {state.errorIcon}
        <h2 className="mt-6 tracking-tight">Oops - there was an issue</h2>
        {typeof state.errorMessage === 'string' ? (
          <h3 className="mt-8 font-bold text-[#FFBB0D]">
            {state.errorMessage.substring(0, 200)}
          </h3>
        ) : null}
        {state.callToAction || <p className="mt-8 ">You can close this page</p>}
      </>
    )
  } else if (state.successMessage) {
    contents = (
      <>
        {state.successIcon}
        <h2 className="mt-6 tracking-tight">{state.successMessage}</h2>
        <p className="mt-8 ">You can close this page</p>
        {state.callToAction}
      </>
    )
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow flex-col w-full justify-center align-center items-center">
        <div className="redirect-container w-80 sm:w-96">
          <Icon name="treasure_chess_full" height="35px" color="#fff" />
          <div className="redirect-contents w-full">{contents}</div>
        </div>
      </div>
      <SiteFooter className="fixed inset-x-0 bottom-0 mx-4" />
    </div>
  )
}

export default Redirect
