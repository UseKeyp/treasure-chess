import { render } from '@redwoodjs/testing/web'

import FilterItems from './FilterItems'

describe('FilterItems', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilterItems />)
    }).not.toThrow()
  })
})
