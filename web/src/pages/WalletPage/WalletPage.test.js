import { render } from '@redwoodjs/testing/web'

import WalletPage from './WalletPage'

describe('WalletPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WalletPage />)
    }).not.toThrow()
  })
})
