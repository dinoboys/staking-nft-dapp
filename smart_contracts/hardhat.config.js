require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-truffle5");
require("hardhat-gas-reporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ACCOUNT = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.7" },
      { version: "0.6.6" },
      { version: "0.8.4" },
      { version: "0.8.0" },
      { version: "0.8.8" },
      { version: "0.8.13" },
      { version: "0.8.14" },
      { version: "0.8.17" },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    ganache: {
      chainId: 1337,
      url: "http://127.0.0.1:7545",
      accounts: [ACCOUNT],
    },
    mainnet: {
      url: process.env.ETHEREUM_RPC_URL,
      chainId: 1,
      blockConfirmations: 6,
      accounts: [ACCOUNT],
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      chainId: 137,
      blockConfirmations: 6,
      accounts: [ACCOUNT],
    },
    arbitrumOne: {
      url: process.env.ARBITRUMONE_RPC_URL,
      chainId: 42161,
      blockConfirmations: 6,
      accounts: [ACCOUNT],
    },
    optimism: {
      url: process.env.OPTIMISM_RPC_URL,
      chainId: 10,
      blockConfirmations: 6,
      accounts: [ACCOUNT],
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      chainId: 5,
      accounts: [ACCOUNT],
      blockConfirmations: 6,
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      chainId: 4,
      blockConfirmations: 6,
      accounts: [ACCOUNT],
    },
    spoila: {
      url: process.env.SPOILA_RPC_URL,
      chainId: 11155111,
      blockConfirmations: 6,
      accounts: [ACCOUNT],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      chainId: 80001,
      accounts: [ACCOUNT],
    },
    bsctestnet: {
      url: process.env.BSCTESTNET_RPC_URL,
      chainId: 97,
      accounts: [ACCOUNT],
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-reports.txt",
    noColors: true,
    currency: "USD",
    coin: "ETH",
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      spoila: ETHERSCAN_API_KEY,
      rinkeby: ETHERSCAN_API_KEY,
    },
  },
};
