import { render } from '@redwoodjs/testing'

import FilterButton from './FilterButton'

describe('FilterButton', () => {

  it('renders successfully', () => {
    expect(() => {
      render(<FilterButton label={'example string'} clickFunction={() => alert('Example function')} />)
    }).not.toThrow()
	})

})
