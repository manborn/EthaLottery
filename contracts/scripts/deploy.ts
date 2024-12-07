import { ethers } from "hardhat";

async function main() {
  const duration = 3600; // 1 hour
  const ticketPrice = ethers.utils.parseEther("0.01"); // 0.01 Ether
  const vrfCoordinator = "<VRF_COORDINATOR_ADDRESS>";
  const linkToken = "<LINK_TOKEN_ADDRESS>";
  const keyHash = "<KEY_HASH>";
  const fee = ethers.utils.parseEther("0.1"); // Adjust based on the network

  const Lottery = await ethers.getContractFactory("EthaLottery");
  const lottery = await Lottery.deploy(
    duration,
    ticketPrice,
    vrfCoordinator,
    linkToken,
    keyHash,
    fee
  );

  await lottery.deployed();
  console.log("Lottery deployed to:", lottery.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
