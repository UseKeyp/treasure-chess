import { render } from '@redwoodjs/testing/web'

import Treasure from './Treasure'

describe('Treasure', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Treasure />)
    }).not.toThrow()
  })
})
