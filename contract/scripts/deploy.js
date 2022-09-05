async function main() {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Contract deployed To", transactions.address);
}



const runMain = async () =>{
  try {
    await main();
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();