import { render } from '@redwoodjs/testing/web'

import Landingpageboxes from './Landingpageboxes'

describe('Landingpageboxes', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Landingpageboxes />)
    }).not.toThrow()
  })
})
