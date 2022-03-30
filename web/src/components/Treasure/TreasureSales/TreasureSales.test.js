import { render } from '@redwoodjs/testing/web'

import TreasureSales from './TreasureSales'

describe('TreasureSales', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureSales />)
    }).not.toThrow()
  })
})
