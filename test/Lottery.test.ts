import { ethers } from "hardhat";
import { expect } from "chai";

describe("DecentralizedLottery", function () {
  it("should allow players to buy tickets and select a winner", async function () {
    const [manager, player1, player2] = await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("DecentralizedLottery");
    const lottery = await Lottery.deploy(
      3600,
      ethers.utils.parseEther("0.01"),
      "<VRF_COORDINATOR_ADDRESS>",
      "<LINK_TOKEN_ADDRESS>",
      "<KEY_HASH>",
      ethers.utils.parseEther("0.1")
    );

    await lottery.deployed();

    // Player1 buys a ticket
    await lottery
      .connect(player1)
      .buyTicket({ value: ethers.utils.parseEther("0.01") });

    // Player2 buys a ticket
    await lottery
      .connect(player2)
      .buyTicket({ value: ethers.utils.parseEther("0.01") });

    // Select winner (manager only)
    await lottery.selectWinner();
  });
});
