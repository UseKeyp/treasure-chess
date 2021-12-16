import React from 'react'
import { ThemeProvider } from '../src/providers/theme'
import AllContextProviders from '../src/providers/context'

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <AllContextProviders>
        <Story />
      </AllContextProviders>
    </ThemeProvider>
  ),
]
