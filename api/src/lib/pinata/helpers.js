import { ecoCodes } from '@treasure-chess/chess-achievements'

export const getDescription = ({ _opening }) => {
  return `A chess game collectible. One of the players of this game created this Treasure. Create your own at https://treasure.chess.com`
}

export const getAttributes = (treasure) => {
  try {
    const [achieve1, achieve2, achieve3] = treasure.achievementNames
    let openingText = ''
    ecoCodes.find((code) => {
      if (code.value === treasure.opening) openingText = code.name
    })
    if (!openingText) throw `Opening not found for enum: ${treasure.opening}`
    const attributes = [{ trait_type: 'Rarity', value: treasure.rarity }]
    if (achieve1)
      attributes.push({
        trait_type: 'Achievement 1',
        value: achieve1,
      })
    if (achieve2)
      attributes.push({
        trait_type: 'Achievement 2',
        value: achieve2,
      })
    if (achieve3)
      attributes.push({
        trait_type: 'Achievement 3',
        value: achieve3,
      })

    attributes.push(
      { trait_type: 'White Player', value: treasure.white.username },
      { trait_type: 'Black Player', value: treasure.black.username },
      { trait_type: 'Winner', value: treasure.outcome },
      { trait_type: 'Opening', value: openingText },
      { trait_type: 'Rule Variant', value: treasure.ruleVariant },
      { trait_type: 'Time Control', value: treasure.timeControl }
    )
    return attributes
  } catch (e) {
    throw `getAttributes() ${e}`
  }
}
