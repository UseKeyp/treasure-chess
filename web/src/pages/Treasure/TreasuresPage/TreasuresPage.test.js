import { render } from '@redwoodjs/testing'

import TreasuresPage from './TreasuresPage'

describe('TreasuresPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasuresPage />)
    }).not.toThrow()
  })
})
