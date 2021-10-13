import FormData from 'form-data'

import { getDescription } from 'src/lib/pinata/helpers'

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.TOKEN_URI_DOMAIN

const fetchPinata = (url) => {
  return fetch(url, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET_KEY,
    },
  }).then((res) => {
    return res.json()
  })
}

const pinFile = async (blob, filename) => {
  if (!filename) throw 'No filename provided'
  let form = new FormData()
  // data.append('file', fs.createReadStream('./yourfile.png'))
  form.append('file', blob, { filepath: 'anyname' })
  // form.append('pinataMetadata', JSON.stringify({ name: filename }))
  const response = await fetch(`${PINATA_API_URL}/pinning/pinFileToIPFS`, {
    method: 'post',
    body: form,
    // maxBodyLength: 'Infinity', // TODO: delete?
    headers: {
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET_KEY,
    },
  }).then((res) => {
    return res.json()
  })
  if (!response.IpfsHash) throw `Couldn't pin file: ${blob}`
  // TODO:  validate pin successful and return only the URL
  return `ipfs://${response.IpfsHash}`
}

const pinJson = async (json) => {
  const response = await fetch(`${PINATA_API_URL}/pinning/pinJSONToIPFS`, {
    method: 'post',
    body: JSON.stringify(json),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET_KEY,
    },
  }).then((res) => {
    return res.json()
  })

  if (!response.IpfsHash) throw `Couldn't pin JSON: ${JSON.stringify(json)}`
  // TODO:  validate pin successful and return only the URL
  return `ipfs://${response.IpfsHash}`
}

export const pinTreasure = async ({ treasure }) => {
  // Generate the HTML
  const htmlString = '<head></head><body></body>'
  // Upload the HTML
  const animation_url = await pinFile(htmlString, `${treasure.id}.html`)

  // Generate snapshot of card  @ final position
  const imageSnapshotData = 'dsfgdfgdfgdfg'
  // Upload the snapshot
  // TODO: ensure file extension is correct
  const image = await pinFile(imageSnapshotData, `${treasure.id}.png`)

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

  const uriObject = {
    description: getDescription({ opening: treasure.opening }), // TODO: Update copy for this
    external_url: `${TOKEN_URI_DOMAIN}/treasures`,
    name: treasure.title,
    attributes,
    animation_url,
    image,
  }
  console.log(uriObject)

  return pinJson(uriObject)
}
