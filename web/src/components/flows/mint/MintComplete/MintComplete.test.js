import { render } from '@redwoodjs/testing'

import MintComplete from './MintComplete'

describe('MintComplete', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MintComplete />)
    }).not.toThrow()
  })
})
