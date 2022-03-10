import { render } from '@redwoodjs/testing/web'

import WalletFormTransfer721 from './WalletFormTransfer721'

describe('WalletFormTransfer721', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WalletFormTransfer721 />)
    }).not.toThrow()
  })
})
