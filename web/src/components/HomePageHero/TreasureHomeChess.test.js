import { render } from '@redwoodjs/testing/web'

import HomePageHero from './HomePageHero'

describe('HomePageHero', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePageHero />)
    }).not.toThrow()
  })
})
