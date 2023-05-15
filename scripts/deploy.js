// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


  async function getbalances(address){
    const balanceBigInt=await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }

  async function consolebalances(addresses){
    let counter=0;
    for(const address of addresses){
      console.log(`address ${counter} balance : `,await getbalances(address));
      counter++;
    }
  }
  async function consolememos(memos){
    for(const memo of memos){
      const timestamp=memo.timestamp;
      const name=memo.name;
      const from=memo.from;
      const message=memo.message;
      console.log(`At ${timestamp},${name},${from},${message}`);
    }
  }
  async function main() {
    const [owner,from1,from2,from3]=await hre.ethers.getSigners();
    const chai=await hre.ethers.getContractFactory("chai");
    const contract = await chai.deploy();

    await contract.deployed();
    console.log("address of contract : ",contract.address);
    const addressess=[owner.address,from1.address,from2.address,from3.address];

    console.log("before buying chai");
    await consolebalances(addressess);

    const amount={value:hre.ethers.utils.parseEther("1")};
    await contract.connect(from1).buychai("from1","very nice",amount);
    await contract.connect(from2).buychai("from2","very nice chai",amount);
    await contract.connect(from3).buychai("from3","very good",amount);

    console.log("after buying chai");
    consolebalances(addressess);

    const memos=await contract.getmemos();
    consolememos(memos);
}
 
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
