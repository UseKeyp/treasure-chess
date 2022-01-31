import { render } from '@redwoodjs/testing/web'

import ChainData from './ChainData'

describe('ChainData', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChainData />)
    }).not.toThrow()
  })
})
