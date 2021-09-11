import { render } from '@redwoodjs/testing'

import MintProcessing from './MintProcessing'

describe('MintProcessing', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MintProcessing />)
    }).not.toThrow()
  })
})
