import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const SubscribePage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Subscribe" description="Subscribe page" />

      <h1>Subscribe to News</h1>
      <div className="mt-6 p-4 rounded-lg bg-chessBlack-100 ">
        <h3>Stay in touch</h3>
        <div className="">
          <iframe
            src={`https://mautic.tools.treasurechess.com/form/1?username=${currentUser?.username}`}
            className="max-w-[500px] w-full"
            height="175"
            title="Subscribe form"
            scrolling="no"
            frameBorder="0"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      </div>
    </>
  )
}

export default SubscribePage
