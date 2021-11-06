import { render } from '@redwoodjs/testing/web'

import Games from './Games'

describe('GamesHistoryList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Games />)
    }).not.toThrow()
  })
})
