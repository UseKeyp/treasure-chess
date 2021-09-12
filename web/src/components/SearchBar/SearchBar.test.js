import { render } from '@redwoodjs/testing'

import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchBar options={['abcd', 'abc', 'defg', 'def']} />)
    }).not.toThrow()
  })
})
