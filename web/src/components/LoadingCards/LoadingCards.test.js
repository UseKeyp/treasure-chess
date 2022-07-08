import { render } from '@redwoodjs/testing/web'

import LoadingCards from './LoadingCards'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoadingCards', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingCards />)
    }).not.toThrow()
  })
})
