# EthaLottery

A decentralized lottery smart contract built with Solidity, allowing participants to buy tickets with Ether. The winner is randomly selected using Chainlink VRF, and the prize pool is automatically distributed.

## Technologies

1. **Solidity:** For writing the smart contract logic.
2. **Hardhat**: For development, testing, and deployment of the smart contract.
3. **Chainlink VRF:** Provides a secure and unbiased random number generator.
4. **Ethers.js:** Enables seamless interaction with the blockchain.
5. **TypeScript:** Used for writing scripts and test cases for the project.

## How It Works

1. **Setup:** The lottery duration and ticket price are defined at deployment.
2. **Ticket Purchase:** Participants call the buyTicket function and pay the ticket price.
3. **Winner Selection:** After the lottery ends, the manager triggers the selectWinner function. Chainlink VRF generates a random number to pick the winner.
4. **Prize Distribution:** The prize pool is automatically transferred to the winner, and the lottery resets for the next round.

## Setup Instructions

1. Clone the repository and install dependencies:

```
git clone <repository-url>
cd Decentralized-Lottery
npm install
```

2. Compile the contract:

`npx hardhat compile`

3. Deploy the contract:

`npx hardhat run scripts/deploy.ts --network goerli`

4. Run tests:

   `npx hardhat test`

## How to Interact

1. <strong>Buy Ticket:</strong>

- Call the buyTicket function with the ticket price (e.g., 0.01 Ether).

2. <strong>Select Winner:</strong>

- After the lottery ends, the manager calls selectWinner to pick a random winner.

3. <strong>Prize Transfer:</strong>

- The winner automatically receives the prize pool.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed. Contributions are welcome!
