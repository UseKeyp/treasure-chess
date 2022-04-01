import { routes } from '@redwoodjs/router'
import { useRedirection } from 'src/providers/redirection'

import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import SiteFooter from 'src/components/SiteFooter'

const Redirect = ({ type }) => {
  const { errorMessage, successMessage, isLoading } = useRedirection()

  let contents = null
  if (isLoading)
    return (
      <div className="min-w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )

  if (errorMessage) {
    let callToAction
    let icon = <Icon name={type} size="29" height="29" color="white" />
    if (type === 'chess') {
      icon = <Icon name="chess_com" size="29" />
      callToAction = (
        <Button
          to={routes.login()}
          className="text-s mt-6"
          size="large"
          color="green"
        >
          Try again
        </Button>
      )
    }
    contents = (
      <>
        <div className="flex align-center bg-black p-4 rounded-lg border-2 border-red">
          {icon}
        </div>
        <h2 className="mt-6 tracking-tight">Oops - there was an issue</h2>
        {typeof errorMessage === 'string' ? (
          <h3 className="mt-8 font-bold text-[#FFBB0D]">
            {errorMessage.substring(0, 200)}
          </h3>
        ) : null}
        {callToAction || <p className="mt-8 ">You can close this page</p>}
      </>
    )
  } else if (successMessage) {
    contents = (
      <>
        <div className="flex align-center bg-black p-4 rounded-lg border-2 border-green">
          <Icon name={type} size="29" height="29" color="white" />
        </div>
        <h2 className="mt-6 tracking-tight">{successMessage}</h2>
        <p className="mt-8 ">You can close this page</p>
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
