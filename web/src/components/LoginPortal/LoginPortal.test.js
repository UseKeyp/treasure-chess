import { render } from '@redwoodjs/testing/web'

import LoginPortal from './LoginPortal'

describe('LoginPortal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPortal />)
    }).not.toThrow()
  })
})
