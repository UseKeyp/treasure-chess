import { render } from '@redwoodjs/testing'

import MintSetTitle from './MintSetTitle'

describe('MintSetTitle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MintSetTitle />)
    }).not.toThrow()
  })
})
