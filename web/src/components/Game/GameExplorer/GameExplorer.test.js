import { render } from '@redwoodjs/testing/web'

import GameExplorer from './GameExplorer'

describe('GameExplorer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GameExplorer />)
    }).not.toThrow()
  })
})
