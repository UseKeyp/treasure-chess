import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'

// const PENDING_LISTED = 'PENDING_LISTED'
// const LISTED = 'LISTED'
// const PENDING_SOLD = 'PENDING_SOLD'
// const SOLD = 'SOLD'
// const PENDING_DELISTED = 'PENDING_DELISTED'
// const DELISTED = 'DELISTED'

export const validateListRequest = async ({ treasure }) => {
  if (treasure.ownerId !== context.currentUser.id)
    throw new EnvelopError(`You don't own this Treasure.`)

  const currentMarketSale = treasure.marketSales[0]
  if (currentMarketSale && !currentMarketSale.isClosed)
    throw new EnvelopError(`This Treasure is already listed.`)
}
