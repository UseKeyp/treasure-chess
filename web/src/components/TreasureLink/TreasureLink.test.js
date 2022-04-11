import { render } from '@redwoodjs/testing'

import TreasureLink from './TreasureLink'

describe('TreasureLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TreasureLink />)
    }).not.toThrow()
  })
})
