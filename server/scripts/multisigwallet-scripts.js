const main = async () => {

    // contract address 0x57f90e954D4214D78bE63D3E1B80FE6762fDD95f
    const MultiSigner = await ethers.getContractFactory("MultiSigner");
    const wallet = await MultiSigner.deploy();

    await wallet.deployed()
    console.log("multisig wallet deployed !", wallet.address);
}

main().
then(() => process.exit(0))
.catch((error) => {
    console.log("Error in Main Function", error)
    process.exit(1);
})