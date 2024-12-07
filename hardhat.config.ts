import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/<API_KEY>",
      accounts: ["<YOUR_PRIVATE_KEY>"],
    },
  },
};

export default config;
