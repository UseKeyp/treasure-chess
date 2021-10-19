import React from 'react'
import { ThemeProvider } from '../src/providers/theme'

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <div style={{ padding: '1em', backgroundColor: '#312e2b' }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
]
