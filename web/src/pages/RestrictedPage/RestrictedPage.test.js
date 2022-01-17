import { render } from '@redwoodjs/testing/web'

import RestrictedPage from './RestrictedPage'

describe('RestrictedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RestrictedPage />)
    }).not.toThrow()
  })
})
