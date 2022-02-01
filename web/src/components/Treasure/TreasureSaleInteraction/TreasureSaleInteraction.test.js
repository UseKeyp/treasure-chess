import { render } from '@redwoodjs/testing/web'

import TreasureSaleInteraction from './TreasureSaleInteraction'

describe('TreasureSaleInteraction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureSaleInteraction />)
    }).not.toThrow()
  })
})
