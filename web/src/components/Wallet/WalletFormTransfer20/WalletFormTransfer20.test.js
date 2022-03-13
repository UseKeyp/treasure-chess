import { render } from '@redwoodjs/testing/web'

import WalletFormTransfer20 from './WalletFormTransfer20'

describe('WalletFormTransfer20', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WalletFormTransfer20 />)
    }).not.toThrow()
  })
})
