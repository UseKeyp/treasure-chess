import { render } from '@redwoodjs/testing/web'

import GamesHistoryList from './GamesHistoryList'

describe('GamesHistoryList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GamesHistoryList />)
    }).not.toThrow()
  })
})
