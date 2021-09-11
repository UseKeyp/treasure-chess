async function main() {
  // We get the contract to deploy
  const Treasure = await ethers.getContractFactory("Treasure");
  const Market = await ethers.getContractFactory("TreasureMarket");
  const Paymaster = await ethers.getContractFactory("SingleRecipientPaymaster");


  const treasure = await Treasure.deploy();

  // uint256 _gasLessRateLimit,
  // address _treasureDeployedAddress,
  // address _forwarder, //ropsten 0xeB230bF62267E94e657b5cbE74bdcea78EB3a5AB. Polygon 0xdA78a11FD57aF7be2eDD804840eA7f4c2A38801d
  // uint _feePercentagePoint,
  // uint _royaltyPercentagePoint
  const market = await Market.deploy(0, treasure.address, "0xeB230bF62267E94e657b5cbE74bdcea78EB3a5AB", 25, 25);

  //address market
  const paymaster = await Paymaster.deploy(market.address);

  console.log("treasure deployed to:", treasure.address);
  console.log("marketplace deployed to:", market.address);
  console.log("paymaster deployed to:", paymaster.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
