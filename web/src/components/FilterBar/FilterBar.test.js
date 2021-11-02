import { render } from '@redwoodjs/testing/web'

import FilterBar from './FilterBar'

describe('FilterBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilterBar />)
    }).not.toThrow()
  })
})
