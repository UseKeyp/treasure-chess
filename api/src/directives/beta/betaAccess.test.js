import { getDirectiveName, mockRedwoodDirective } from '@redwoodjs/testing/api'

import betaAccess from './betaAccess'

describe('betaAccess directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(betaAccess.schema).toBeTruthy()
    expect(getDirectiveName(betaAccess.schema)).toBe('betaAccess')
  })

  it('betaAccess has stub implementation. Should not throw when current user has beta access', () => {
    const mockExecution = mockRedwoodDirective(betaAccess, {
      context: { currentUser: { betaAccess: true } },
    })
    expect(mockExecution).not.toThrowError()
  })

  it('betaAccess has stub implementation. Should throw ForbiddenError when current user does not have beta access', () => {
    const mockExecution = mockRedwoodDirective(betaAccess, {
      context: { currentUser: { betaAccess: false } },
    })
    expect(mockExecution).toThrowError()
  })
})
