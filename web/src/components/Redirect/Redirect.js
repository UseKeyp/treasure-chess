import { routes, Link } from '@redwoodjs/router'
import { useRedirection } from 'src/providers/redirection'

import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import SiteFooter from 'src/components/SiteFooter'

const Redirect = ({ type }) => {
  const { errorMessage, successMessage, isLoading } = useRedirection()

  if (isLoading)
    return (
      <div className="min-w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )

  let callToAction
  let iconName = type
  if (type === 'chess') {
    iconName = 'chess_com'
    if (successMessage) {
      callToAction = (
        <Button
          to={routes.profile()}
          className="text-s mt-6"
          size="large"
          color="green"
        >
          See Profile
        </Button>
      )
    } else {
      callToAction = (
        <Button
          to={routes.signin()}
          className="text-s mt-6"
          size="large"
          color="green"
        >
          Try again
        </Button>
      )
    }
  }
  return (
    <div className="flex flex-col min-h-screen chess-background">
      <div className="flex flex-grow flex-col w-full justify-center align-center items-center">
        <div className="redirect-container w-80 sm:w-96">
          <Link to={routes.home()}>
            <Icon name="treasure_chess_full" height="35px" color="#fff" />
          </Link>
          <div className="redirect-contents w-full">
            <div
              className={`flex align-center bg-black p-4 rounded-lg border-2 border-${
                successMessage ? `green` : `[#FFBB0D]`
              }`}
            >
              <Icon name={iconName} size="29" height="29" color="white" />
            </div>
            <div className="mt-6 tracking-tight">
              {successMessage}
              {typeof errorMessage === 'string' ? (
                <>
                  <h2 className="mt-6 tracking-tight">
                    Oops - there was an issue
                  </h2>
                  <h3 className="mt-8 font-bold text-errorYellow">
                    {errorMessage.substring(0, 200)}
                  </h3>
                </>
              ) : null}
            </div>
            {callToAction || <p className="mt-8 ">You can close this page</p>}
          </div>
        </div>
      </div>
      <SiteFooter className="fixed inset-x-0 bottom-0 mx-4" />
    </div>
  )
}

export default Redirect
