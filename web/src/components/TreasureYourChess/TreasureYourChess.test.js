import { render } from '@redwoodjs/testing/web'

import TreasureYourChess from './TreasureYourChess'

describe('TreasureYourChess', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureYourChess />)
    }).not.toThrow()
  })
})
