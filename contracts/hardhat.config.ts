import { HardhatUserConfig, task } from 'hardhat/config'
import { config as dotEnvConfig } from 'dotenv'
dotEnvConfig()
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-prettier'
import '@typechain/hardhat'
import 'solidity-coverage'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (_args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    ropsten: {
      url: `${process.env.infuralink}`,
      accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`],
    },
  },
}

//npx hardhat run --network ropsten deploy/001_deploy_contracts.ts

export default config
