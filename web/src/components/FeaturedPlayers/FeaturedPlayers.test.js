import { render } from '@redwoodjs/testing/web'

import FeaturedPlayers from './FeaturedPlayers'

describe('FeaturedPlayers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeaturedPlayers />)
    }).not.toThrow()
  })
})
