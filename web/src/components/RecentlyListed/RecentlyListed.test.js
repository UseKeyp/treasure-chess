import { render } from '@redwoodjs/testing/web'

import RecentlyListed from './RecentlyListed'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecentlyListed', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecentlyListed />)
    }).not.toThrow()
  })
})
