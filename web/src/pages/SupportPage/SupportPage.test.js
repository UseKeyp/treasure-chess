import { render } from '@redwoodjs/testing'

import SupportPage from './SupportPage'

describe('SupportPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SupportPage />)
    }).not.toThrow()
  })
})
