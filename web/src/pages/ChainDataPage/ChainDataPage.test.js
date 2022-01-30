import { render } from '@redwoodjs/testing/web'

import ChainDataPage from './ChainDataPage'

describe('ChainDataPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChainDataPage />)
    }).not.toThrow()
  })
})
