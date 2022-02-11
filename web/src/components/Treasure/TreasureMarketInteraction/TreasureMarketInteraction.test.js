import { render } from '@redwoodjs/testing/web'

import TreasureMarketInteraction from './TreasureMarketInteraction'

describe('TreasureMarketInteraction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureMarketInteraction />)
    }).not.toThrow()
  })
})
