import { toast } from '@redwoodjs/web/toast'
import { getErrorResponse } from 'src/utils/auth/helpers'

export const logIn = async (attributes) => {
  try {
    /* eslint-disable-next-line no-undef */
    const { type, code, state } = attributes
    // eslint-disable-next-line no-undef
    const response = await fetch(global.RWJS_API_DBAUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state, type, method: 'login' }),
    })
    return await response.json()
  } catch (e) {
    /* eslint-disable-next-line no-console */
    const errorMessage = getErrorResponse(`${e}.`, 'login').error.message
    toast.error(errorMessage)
    /* eslint-disable-next-line no-console */
    console.log(errorMessage)
  }
}
