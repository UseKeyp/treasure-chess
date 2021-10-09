import { getDescription } from 'src/lib/pinata/helpers'

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.TOKEN_URI_DOMAIN

const fetchPinata = (url, data) => {
  const stringData = JSON.stringify(data)
  return fetch(url, {
    method: data ? 'post' : 'get',
    ...(stringData && { body: stringData }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET_KEY,
    },
  }).then((res) => {
    // TODO: REMOVE LOG
    console.log(res)
    return res.json()
  })
}

const pin = (blob) =>
  fetchPinata(`${PINATA_API_URL}/pinning/pinJSONToIPFS`, blob)

export const pinTreasure = async ({ treasure }) => {
  // Generate the HTML
  const htmlString = '<head></head><body></body>'
  // Upload the HTML
  const animation_url = await pin(htmlString)

  // Generate snapshot of card  @ final position
  const imageSnapshotData = 'dsfgdfgdfgdfg'
  // Upload the snapshot
  const image = await pin(imageSnapshotData)

  // Upload the JSON blob
  const achievementsArray = treasure.achievements.split(',')
  const attributes = [
    { trait_type: 'Rarity', value: treasure.rarity },
    { trait_type: 'Achievement 1', value: achievementsArray[0] },
    { trait_type: 'Achievement 2', value: achievementsArray[1] },
    { trait_type: 'Achievement 3', value: achievementsArray[2] },
    { trait_type: 'White Player', value: treasure.whiteUsername },
    { trait_type: 'Black Player', value: treasure.blackUsername },
    { trait_type: 'Winner', value: treasure.outcome },
    { trait_type: 'Opening', value: treasure.opening },
    { trait_type: 'Rule Variant', value: treasure.ruleVariant },
    { trait_type: 'Time Control', value: treasure.timeControl },
  ]

  const blob = {
    description: getDescription({ opening: treasure.opening }), // TODO: Update copy for this
    external_url: `${TOKEN_URI_DOMAIN}/treasures`,
    name: treasure.title,
    attributes,
    animation_url,
    image,
  }
  console.log(blob)

  return pin(blob)
}
