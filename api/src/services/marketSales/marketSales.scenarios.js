import {
  generateRandomTreasures,
  generateRandomMembers,
} from '../../../../scripts/seed/helpers'

const generatedMembers = generateRandomMembers(4, 0)
// NOTE: alice and bob own all the treasures
const generatedTreasures = generateRandomTreasures(2, 0, [
  generatedMembers[0],
  generatedMembers[1],
])

const treasure = {}
generatedTreasures.map((item, index) => {
  treasure[index] = { data: item }
})

const member = {}
const names = ['alice', 'bob', 'carol', 'dan', 'eve']
generatedMembers.map((item, index) => {
  member[names[index]] = { data: item }
})

treasure[1].data.marketSales = {
  create: {
    seller: {
      connect: {
        id: member.alice.data.id,
      },
    },
    status: 'LISTED',
    amount: 1,
    listTx: {
      create: {
        id: `0x56570de287d73cd1cb6092bb8fdee6173974955fdef345ae579ee9f475ea${Math.floor(
          Math.random() * (9999 - 1000 + 1) + 1000
        )}`,
        status: 'COMPLETE',
      },
    },
  },
}

export const standard = defineScenario({
  member,
  treasure,
})
