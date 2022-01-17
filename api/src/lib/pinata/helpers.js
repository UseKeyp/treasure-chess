export const getDescription = ({ _opening }) => {
  return `A chess game collectible. One of the players of this game created this Treasure. Create your own at https://treasure.chess.com`
}

export const getAttributes = (treasure) => {
  const [achieve1, achieve2, achieve3] = treasure.achievements.split(',')
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
    { trait_type: 'Opening', value: treasure.opening },
    { trait_type: 'Rule Variant', value: treasure.ruleVariant },
    { trait_type: 'Time Control', value: treasure.timeControl }
  )
  return attributes
}
