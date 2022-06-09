import { render } from '@redwoodjs/testing/web'

import Settings from './Settings'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Settings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Settings />)
    }).not.toThrow()
  })
})
