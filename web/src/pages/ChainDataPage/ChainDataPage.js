import { MetaTags } from '@redwoodjs/web'

import ChainDataCell from 'src/components/ChainData/ChainDataCell'

const ChainDataPage = () => {
  return (
    <>
      <MetaTags
        title="Chain Data"
        description="Technical info for developers and inquisitive minds."
      />
      <h1>Chain Data</h1>
      <h3 className="mt-4">
        Technical info for developers and inquisitive minds.
      </h3>
      <div className="mt-4">
        <ChainDataCell />
      </div>
    </>
  )
}

export default ChainDataPage
