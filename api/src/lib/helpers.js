export const isHexAddress = (address) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}

export const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null

export const isProduction =
  process.env.NODE_ENV !== 'development' || process.env.NODE_ENV !== null
