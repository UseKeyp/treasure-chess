import React from 'react'
import AllContextProviders from '../src/providers'

export const decorators = [
  (Story) => (
    <AllContextProviders>
      <Story />
    </AllContextProviders>
  ),
]
