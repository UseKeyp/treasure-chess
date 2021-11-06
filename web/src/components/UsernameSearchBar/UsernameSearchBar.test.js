import { render } from '@redwoodjs/testing'

import UsernameSearchBar from './UsernameSearchBar'

describe('UsernameSearchBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsernameSearchBar options={['abcd', 'abc', 'defg', 'def']} />)
    }).not.toThrow()
  })
})
