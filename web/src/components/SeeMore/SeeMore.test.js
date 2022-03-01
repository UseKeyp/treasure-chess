import { render } from '@redwoodjs/testing/web'

import SeeMore from './SeeMore'

describe('SeeMore', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SeeMore />)
    }).not.toThrow()
  })
})
