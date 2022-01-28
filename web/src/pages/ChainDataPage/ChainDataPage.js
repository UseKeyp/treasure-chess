import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ChainDataPage = () => {
  return (
    <>
      <MetaTags title="ChainData" description="ChainData page" />

      <h1>ChainDataPage</h1>
      <p>
        Find me in <code>./web/src/pages/ChainDataPage/ChainDataPage.js</code>
      </p>
      <p>
        My default route is named <code>chainData</code>, link to me with `
        <Link to={routes.chainData()}>ChainData</Link>`
      </p>
    </>
  )
}

export default ChainDataPage
