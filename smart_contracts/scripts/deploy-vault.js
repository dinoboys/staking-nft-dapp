const hre = require("hardhat");
const fs = require("fs");
const fse = require("fs-extra");
const { verify } = require("../utils/verify");
const {
  getAmountInWei,
  developmentChains,
} = require("../utils/helper-scripts");

async function main() {
  const deployNetwork = hre.network.name;

  // FlappyOwl NFT Descriptor contract
  const DescriptorContract = await ethers.getContractFactory("FODescriptor");
  const descriptorContract = await DescriptorContract.deploy();
  await descriptorContract.deployed();

  // Deploy FlappyOwl NFT contract
  const maxSupply = 69069;
  const mintCost = getAmountInWei(0.5);
  const maxMintAmountPerTx = 10;
  const mintLimit = 10;
  const mintingStatus = true;
  const updatableSeed = true;

  const NFTContract = await ethers.getContractFactory("FlappyOwlNft");
  const nftContract = await NFTContract.deploy(
    mintingStatus,
    updatableSeed,
    mintCost,
    maxSupply,
    maxMintAmountPerTx,
    mintLimit,
    descriptorContract.address
  );
  await nftContract.deployed();

  // Deploy FlappyOwl ERC20 token contract
  const TokenContract = await ethers.getContractFactory("FlappyOwlToken");
  const tokenContract = await TokenContract.deploy();

  await tokenContract.deployed();

  // Deploy FlappyOwlStakingVault contract
  const Vault = await ethers.getContractFactory("FlappyOwlStakingVault");
  const stakingVault = await Vault.deploy(
    nftContract.address,
    tokenContract.address
  );

  await stakingVault.deployed();

  const control_tx = await tokenContract.setController(
    stakingVault.address,
    true
  );
  await control_tx.wait();

  console.log(
    "FlappyOwl Descriptor contract deployed at:\n",
    descriptorContract.address
  );
  console.log("FlappyOwl NFT contract deployed at:\n", nftContract.address);
  console.log(
    "FlappyOwl ERC20 token contract deployed at:\n",
    tokenContract.address
  );
  console.log("NFT Staking Vault deployed at:\n", stakingVault.address);
  console.log("Network deployed to :\n", deployNetwork);

  /* transfer contracts addresses & ABIs to the front-end */
  if (fs.existsSync("../front-end/src")) {
    fs.rmSync("../src/artifacts", { recursive: true, force: true });
    fse.copySync("./artifacts/contracts", "../front-end/src/artifacts");
    fs.writeFileSync(
      "../front-end/src/utils/contracts-config.js",
      `
      export const stakingContractAddress = "${stakingVault.address}"
      export const nftContractAddress = "${nftContract.address}"
      export const tokenContractAddress = "${tokenContract.address}"
      export const ownerAddress = "${stakingVault.signer.address}"
      export const networkDeployedTo = "${hre.network.config.chainId}"
    `
    );
  }

  if (
    !developmentChains.includes(deployNetwork) &&
    hre.config.etherscan.apiKey[deployNetwork]
  ) {
    console.log("waiting for 6 blocks verification ...");
    await stakingVault.deployTransaction.wait(6);

    // args represent contract constructor arguments
    const args = [nftContract.address, tokenContract.address];
    await verify(stakingVault.address, args);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
