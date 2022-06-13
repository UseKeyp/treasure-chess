/* eslint-disable */
import { updateMauticContactMinted } from './mautic'

describe('Update mautic contact', () => {
  it('updates mautic contact treasures_minted', async () => {
    await updateMauticContactMinted({ member: { username: 'niftytesting' } })
  })
})
