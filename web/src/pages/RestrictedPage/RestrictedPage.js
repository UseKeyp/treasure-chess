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
            <div className="not-found--content">
              <h1>🛠️ Maintenance in Progress 🚧</h1>
              <h3 className="mt-10 ">Please check back later</h3>
              <div className="not-found--content--go-home flex justify-center ">
                <input
                  placeholder="Password"
                  className="restrictedInput"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                <button
                  className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
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
