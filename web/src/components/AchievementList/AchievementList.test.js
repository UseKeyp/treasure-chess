import { render } from '@redwoodjs/testing/web'

import AchievementList from './AchievementList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AchievementList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AchievementList />)
    }).not.toThrow()
  })
})
