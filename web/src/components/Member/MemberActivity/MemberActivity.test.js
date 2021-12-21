import { render } from '@redwoodjs/testing'

import MemberActivity from './MemberActivity'

describe('MemberActivity', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberActivity />)
    }).not.toThrow()
  })
})
