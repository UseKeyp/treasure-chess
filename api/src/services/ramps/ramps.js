import { db } from 'src/lib/db'
import { EnvelopError } from '@envelop/core'
import { transferUsdc } from 'src/lib/web3/tokens'
import { getRampOffUrl, getRampOnUrl } from 'src/lib/ramps'

export const ramps = async () => {
  const ramps = await db.ramp.findMany({
    where: { memberId: context.currentUser.id },
    orderBy: { createdAt: 'desc' },
  })
  // Get only the most recent for each type
  const wyreRamp = ramps.find((ramp) => ramp.type == 'WYRE')
  const coinbaseRamp = ramps.find((ramp) => ramp.type == 'COINBASE')
  let filtered = []
  if (wyreRamp) filtered.push(wyreRamp)
  if (coinbaseRamp) filtered.push(coinbaseRamp)
  return filtered
}

export const rampWithdraw = async ({ type, amount }) => {
  if (!Number(amount) > 0)
    throw new EnvelopError('Value must be greater than 0')
  const availableRamps = await ramps()
  const ramp = availableRamps.find((ramp) => ramp.type == type)
  if (!ramp)
    throw new EnvelopError(`You don't have a ramp connected yet for ${type}`)
  const tx = await transferUsdc({ to: ramp.address, amount })
  // TODO: create ramp withdraw tx
  // TODO: Send email receipts
  await db.rampWithdraw.create({
    data: {
      toAddress: ramp.address,
      amount: Number(amount),
      transaction: { create: { id: tx.hash } },
      member: { connect: { id: context.currentUser.id } },
      ramp: { connect: { id: ramp.id } },
    },
  })
  return { id: tx.hash }
}

export const getRampUrl = async ({ type, direction }) => {
  if (direction === 'ON') return getRampOnUrl({ type })
  return getRampOffUrl({ type })
}
