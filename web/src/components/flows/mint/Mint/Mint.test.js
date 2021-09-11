import { render } from '@redwoodjs/testing'

import Mint from './Mint'

describe('Mint', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Mint />)
    }).not.toThrow()
  })
})
