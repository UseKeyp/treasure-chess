const fs = require('fs-extra')
const path = require('path')

console.log('====================================')
console.log('Copying ABIs to api/src/lib/web3...')

const getAbiString = (abi) => `const abi = ${JSON.stringify(abi)}
export default abi
`

const compileAbi = (inputPath, outputPath) => {
  const jsonBlob = require(path.join(__dirname, inputPath))
  const { abi } = jsonBlob

  fs.writeFile(path.join(__dirname, outputPath), getAbiString(abi), (err) => {
    if (err) throw err
  })
}

compileAbi(
  '../contracts/artifacts/contracts/Treasure.sol/Treasure.json',
  '../api/src/lib/web3/treasure/treasureAbi.js'
)
compileAbi(
  '../contracts/artifacts/contracts/TreasureMarket.sol/TreasureMarket.json',
  '../api/src/lib/web3/treasureMarket/treasureMarketAbi.js'
)

console.log('Done!')
console.log('====================================')
