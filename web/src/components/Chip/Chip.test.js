import { render } from '@redwoodjs/testing/web'

import Chip from './Chip'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Chip', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Chip />)
    }).not.toThrow()
  })
})
