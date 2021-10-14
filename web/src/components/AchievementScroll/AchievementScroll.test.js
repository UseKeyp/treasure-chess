import { render } from '@redwoodjs/testing/web'

import AchievementScroll from './AchievementScroll'

describe('AchievementScroll', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AchievementScroll />)
    }).not.toThrow()
  })
})
