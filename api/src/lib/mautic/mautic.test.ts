/* eslint-disable */
import { updateMauticContactMinted } from './mautic'

describe('Update mautic contact', () => {
  it('updates mautic contact treasures_minted', async () => {
    await updateMauticContactMinted({
      purchase: {
        treasure: {
          tokenId: 3,
          rarity: 'Great',
        },
      },
      member: {
        username: 'niftytesting',
      },
    })
  })
})
