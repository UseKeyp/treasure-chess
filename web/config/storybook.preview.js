import React from 'react'
import { ThemeProvider } from '../src/providers/theme'
import AllContextProviders from '../src/providers/context'

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <AllContextProviders>
        <div style={{ padding: '1em', backgroundColor: '#312e2b' }}>
          <Story />
        </div>
      </AllContextProviders>
    </ThemeProvider>
  ),
]
