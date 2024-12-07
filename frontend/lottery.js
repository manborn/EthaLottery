import { ethers } from "ethers";
import lotteryAbi from "./artifacts/contracts/EthaLottery.sol/EthaLottery.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const lotteryAddress = "<DEPLOYED_CONTRACT_ADDRESS>";
const lotteryContract = new ethers.Contract(
  lotteryAddress,
  lotteryAbi.abi,
  signer
);

async function buyTicket() {
  const ticketPrice = ethers.utils.parseEther("0.01");
  const tx = await lotteryContract.buyTicket({ value: ticketPrice });
  await tx.wait();
  console.log("Ticket purchased!");
}

async function selectWinner() {
  const tx = await lotteryContract.selectWinner();
  await tx.wait();
  console.log("Winner selected!");
}
