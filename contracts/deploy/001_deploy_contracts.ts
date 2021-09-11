import { HardhatRuntimeEnvironment } from "hardhat/types";
import {DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy("Treasure", {
    from: deployer,
    args: [],
    log: true
  });

  const treasureAddress = await deployments.get(contract.Treasure);

  await deploy("TreasureMarket", {
    from: deployer,
    args: [treasureAddress],
    log: true
  });

  const treasureMarketAddress = await deployments.get(contract.TreasureMarket);

  await deploy("Paymaster", {
    from: deployer,
    args: [treasureMarketAddress],
    log: true
  });
}

export default func;
func.tags = ["Treasure"];
