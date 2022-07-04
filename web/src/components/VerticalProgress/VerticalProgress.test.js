import { render } from '@redwoodjs/testing/web'

import VerticalProgress from './VerticalProgress'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VerticalProgress', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VerticalProgress />)
    }).not.toThrow()
  })
})
