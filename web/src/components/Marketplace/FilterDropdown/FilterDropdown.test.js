import { render } from '@redwoodjs/testing'

import FilterDropdown from './FilterDropdown'

describe('FilterDropdown', () => {

  it('renders successfully', () => {
    expect(() => {
      render(<FilterDropdown label={'example string'} />)
    }).not.toThrow()
	})

})
