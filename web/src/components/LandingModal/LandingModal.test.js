import { render } from '@redwoodjs/testing/web'

import LandingModal from './LandingModal'

describe('LandingModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LandingModal />)
    }).not.toThrow()
  })
})
