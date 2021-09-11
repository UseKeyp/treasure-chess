import { render } from '@redwoodjs/testing'

import MintPay from './MintPay'

describe('MintPay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MintPay />)
    }).not.toThrow()
  })
})
