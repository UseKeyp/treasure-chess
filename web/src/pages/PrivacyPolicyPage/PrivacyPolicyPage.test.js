import { render } from '@redwoodjs/testing/web'

import PrivacyPolicyPage from './PrivacyPolicyPage'

describe('PrivacyPolicyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PrivacyPolicyPage />)
    }).not.toThrow()
  })
})
