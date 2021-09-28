import { LOCAL_TOKEN_KEY } from 'src/auth/constants'

export const saveJwt = (jwt) => localStorage.setItem(LOCAL_TOKEN_KEY, jwt)
export const getJwt = () => localStorage.getItem(LOCAL_TOKEN_KEY)
export const deleteJwt = () => localStorage.removeItem(LOCAL_TOKEN_KEY)

export const getErrorResponse = (error, functionName) => {
  const errorText = typeof error === 'string' ? error : error.message
  const res = {
    /* eslint-disable-nextline i18next/no-literal-string */
    message: `Error auth ${functionName}(): ${errorText}`,
  }
  const ABORTED = 'aborted'
  const EXCEPTION = 'exception'
  const UNKOWN = 'unknown error type'
  if (error.code) {
    res.code = error.code
    switch (error.code) {
      case 4001:
        res.txErrorType = ABORTED
        break
      case -32016:
        res.txErrorType = EXCEPTION
        break
      default:
        res.txErrorType = UNKOWN
    }
  }
  return { error: res }
}
