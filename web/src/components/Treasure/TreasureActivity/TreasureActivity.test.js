import { render } from '@redwoodjs/testing/web'

import TreasureActivity from './TreasureActivity'

describe('TreasureActivity', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureActivity />)
    }).not.toThrow()
  })
})
