import { render } from '@redwoodjs/testing/web'

import FilterPriceInput from './FilterPriceInput'

describe('FilterPriceInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilterPriceInput />)
    }).not.toThrow()
  })
})
