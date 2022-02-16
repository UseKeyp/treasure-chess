import { render } from '@redwoodjs/testing/web'

import TreasuresPlayed from './TreasuresPlayed'

describe('TreasuresPlayed', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasuresPlayed />)
    }).not.toThrow()
  })
})
