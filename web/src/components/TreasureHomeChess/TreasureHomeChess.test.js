import { render } from '@redwoodjs/testing/web'

import TreasureHomeChess from './TreasureHomeChess'

describe('TreasureHomeChess', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureHomeChess />)
    }).not.toThrow()
  })
})
