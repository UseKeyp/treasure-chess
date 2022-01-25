import {
  generateRandomTreasures,
  generateRandomMembers,
} from '../../../../scripts/seed/helpers'

const members = generateRandomMembers(2, 0)
const treasures = generateRandomTreasures(1, 0, members)

const treasure = {}
treasures.map((item, index) => {
  treasure[index] = { data: item }
})

const member = {}
members.map((item, index) => {
  member[index] = { data: item }
})

export const standard = defineScenario({
  member,
  treasure,
})
