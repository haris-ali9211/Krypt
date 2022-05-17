
const main = async () => {

  const Transaction = await hre.ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.deployed();

  console.log("Transaction deployed to:", transaction.address);
}

const runMin = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("🚀 ~ file: deploy.js ~ line 17 ~ runMin ~ error", error);
    process.exit(1);
  }
}
runMin();