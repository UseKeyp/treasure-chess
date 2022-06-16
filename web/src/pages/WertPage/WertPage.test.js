import { render } from '@redwoodjs/testing/web'

import WertPage from './WertPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WertPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WertPage />)
    }).not.toThrow()
  })
})
