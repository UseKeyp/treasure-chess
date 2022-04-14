import { generateRandomMembers } from '../../../../scripts/seed/helpers'

const generatedMembers = generateRandomMembers(4, 0)
// NOTE: alice and bob own all the treasures

const member = {}
const names = ['alice', 'bob', 'carol', 'dan', 'eve']
generatedMembers.map((item, index) => {
  member[names[index]] = { data: item }
})
const mintPurchase = {
  one: {
    data: {
      id: 1,
      memberId: '0',
      gameId: 'randomGameId',
      gameEndTime: '2021-07-19T20:38:36.000Z',
      title: 'Embarrassed she beat a gm',
      paymentType: 'MINTCREDIT',
      status: 'PENDING',
      orderStatus: 'COMPLETE',
      orderId: null,
      reservation: null,
      transactionId: null,
    },
  },
}

export const standard = defineScenario({
  member,
  mintPurchase,
})
