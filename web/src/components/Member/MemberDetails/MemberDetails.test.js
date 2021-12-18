import { render } from '@redwoodjs/testing'

import MemberDetails from './MemberDetails'

describe('MemberDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberDetails />)
    }).not.toThrow()
  })
})
