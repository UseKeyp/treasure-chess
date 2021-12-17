import { render } from '@redwoodjs/testing/web'

import MemberBalance from './MemberBalance'

describe('MemberBalance', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberBalance />)
    }).not.toThrow()
  })
})
