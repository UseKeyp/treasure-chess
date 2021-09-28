import { render } from '@redwoodjs/testing'

import MarketplacePage from './MarketplacePage'

describe('MarketplacePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MarketplacePage />)
    }).not.toThrow()
  })
})
