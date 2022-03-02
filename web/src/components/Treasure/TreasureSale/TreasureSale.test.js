import { render } from '@redwoodjs/testing/web'

import TreasureSale from './TreasureSale'

describe('TreasureSale', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureSale />)
    }).not.toThrow()
  })
})
