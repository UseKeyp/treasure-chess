import { ethers } from 'hardhat'
import { deployContracts } from '../scripts/helpers'
import { expect } from './chai-setup'
import TreasureArtifact from '../artifacts/contracts/Treasure.sol/Treasure.json'
import TreasureMarketArtifact from '../artifacts/contracts/TreasureMarket.sol/TreasureMarket.json'
import { Treasure, TreasureMarket } from '../typechain'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

const getHashedMove = async (move: number) => {
  const now = new Date().getMilliseconds()
  const salt = ethers.utils.id(now.toString())
  const hashedMove = ethers.utils.solidityKeccak256(
    ['uint8', 'bytes32'],
    [move, salt]
  )
  return { hashedMove, salt }
}

describe('Treasure & Treasure Market Contract Tests', () => {
  let Admin: SignerWithAddress
  let Alice: SignerWithAddress
  let Bob: SignerWithAddress
  let treasure: Treasure
  let treasureMarket: TreasureMarket
  before(async () => {
    const [owner, alice, bob] = await ethers.getSigners()
    Admin = owner
    Alice = alice
    Bob = bob

    const { treasureContract, treasureMarketContract } = await deployContracts()

    treasure = treasureContract
    treasureMarket = treasureMarketContract
  })

  it('Should initialize properly', async () => {
    expect(await treasure.owner()).equal(Admin.address)
    expect(await treasure.name()).equal('Treasure Chess')
    expect(await treasure.symbol()).equal('CHESS')
    expect(await treasure.admins(Admin.address)).equal(true)
  })

  it('Should handle mint properly', async () => {
    const { hashedMove } = await getHashedMove(1)
    // Should revert non-admin mint
    await expect(
      treasure
        .connect(Alice)
        .mint(
          Alice.address,
          'https://ethereum.org',
          hashedMove,
          0,
          0,
          0,
          0,
          false
        )
    ).to.be.revertedWith('Only admins can call this function.')
  })

  it('Should revert mints when appropriate', async () => {
    const { hashedMove } = await getHashedMove(1)
    const { hashedMove: hashedMoveB } = await getHashedMove(0)

    // Should allow admin mint
    await expect(
      treasure
        .connect(Admin)
        .mint(
          Admin.address,
          'https://ethereum.org',
          hashedMove,
          0,
          0,
          0,
          0,
          true
        )
    )
      .to.emit(treasure, 'GameMinted')
      .withArgs(Admin.address, 1, 'https://ethereum.org', hashedMove)

    // Should allow new admin mint
    await expect(treasure.addAdmin(Alice.address))
      .to.emit(treasure, 'AdminAdded')
      .withArgs(Admin.address, Alice.address)

    await expect(
      treasure
        .connect(Alice)
        .mint(
          Alice.address,
          'https://ethereum.org',
          hashedMoveB,
          0,
          0,
          0,
          0,
          false
        )
    )
      .to.emit(treasure, 'GameMinted')
      .withArgs(Alice.address, 2, 'https://ethereum.org', hashedMoveB)

    expect(await treasure.getOriginalPlayer(1)).to.equal(Admin.address)
    expect(await treasure.getOriginalPlayer(2)).to.equal(Alice.address)
    expect(await treasure.getTotalGames()).to.equal(2)

    await expect(treasure.connect(Admin).removeAdmin(Alice.address))
      .to.emit(treasure, 'AdminRemoved')
      .withArgs(Admin.address, Alice.address)

    // Should not allow removed admin to mint
    await expect(
      treasure
        .connect(Alice)
        .mint(
          Alice.address,
          'https://ethereum.org',
          hashedMove,
          0,
          0,
          0,
          0,
          false
        )
    ).to.be.revertedWith('Only admins can call this function.')
  })
})
