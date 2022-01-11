import { render } from '@redwoodjs/testing'

import ProfileBox from './ProfileBox'

describe('ProfileBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileBox />)
    }).not.toThrow()
  })
})
