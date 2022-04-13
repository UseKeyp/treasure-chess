import { render } from '@redwoodjs/testing/web'

import MemberMintCredits from './MemberMintCredits'

describe('MemberMintCredits', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberMintCredits />)
    }).not.toThrow()
  })
})
