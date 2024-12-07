import { ethers } from "hardhat";

async function main() {
  const lotteryAddress = "<DEPLOYED_CONTRACT_ADDRESS>";
  const Lottery = await ethers.getContractAt("EthaLottery", lotteryAddress);

  // Buy a ticket
  const ticketPrice = ethers.utils.parseEther("0.01");
  const tx = await Lottery.buyTicket({ value: ticketPrice });
  await tx.wait();
  console.log("Ticket purchased!");

  // Trigger winner selection (manager only)
  const tx2 = await Lottery.selectWinner();
  await tx2.wait();
  console.log("Winner selected!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
