import React from 'react'
import { ThemeProvider } from '../src/providers/theme'
import { ContextProvider } from '../src/providers/context'

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <ContextProvider>
        <div style={{ padding: '1em', backgroundColor: '#312e2b' }}>
          <Story />
        </div>
      </ContextProvider>
    </ThemeProvider>
  ),
]
