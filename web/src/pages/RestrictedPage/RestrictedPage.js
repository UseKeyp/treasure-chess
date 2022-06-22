import { useRestricted } from 'src/providers/restricted/restricted'
import { MetaTags } from '@redwoodjs/web'

const RestrictedPage = () => {
  const [value, setValue] = React.useState('')

  const { submitPassword, status } = useRestricted()

  return (
    <>
      <MetaTags title="Restricted" />
      <div className="chess-background w-screen h-screen">
        <main className="not-found">
          <section className="not-found--container">
            <div className="not-found--img">
              <img src="/no-go.png" className="h-auto w-full block" alt="" />
            </div>
            <div className="not-found--content">
              <h1>This site is restricted</h1>
              <div className="not-found--content--go-home flex justify-center">
                <input
                  placeholder="Password"
                  className="restrictedInput"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                <button
                  onClick={() => {
                    submitPassword(value)
                  }}
                >
                  Submit
                </button>
              </div>
              <p>{status}</p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default RestrictedPage
