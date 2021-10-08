import { render } from '@redwoodjs/testing/web'

import FilterTextInput from './FilterTextInput'

describe('FilterTextInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FilterTextInput />)
    }).not.toThrow()
  })
})
