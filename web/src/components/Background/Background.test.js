import { render } from '@redwoodjs/testing'

import Background from './Background'

describe('Background', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Background />)
    }).not.toThrow()
  })
})
