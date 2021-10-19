import { render } from '@redwoodjs/testing/web'

import FilterCheckbox from './FilterCheckbox'

describe('FilterCheckbox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilterCheckbox />)
    }).not.toThrow()
  })
})
