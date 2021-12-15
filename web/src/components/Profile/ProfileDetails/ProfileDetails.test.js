import { render } from '@redwoodjs/testing'

import ProfileDetails from './ProfileDetails'

describe('ProfileDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileDetails />)
    }).not.toThrow()
  })
})
