import { render } from '@redwoodjs/testing/web'

import SortingDropdown from './SortingDropdown'

describe('SortingDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortingDropdown />)
    }).not.toThrow()
  })
})
