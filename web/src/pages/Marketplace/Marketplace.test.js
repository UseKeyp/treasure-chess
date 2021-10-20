import { render } from '@redwoodjs/testing'

import Marketplace from './Marketplace'

describe('Marketplace', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Marketplace />)
    }).not.toThrow()
  })
})
