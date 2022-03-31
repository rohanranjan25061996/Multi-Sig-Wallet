const main = async () => {

    // contract address 0xD693b2dB580fcC70FD7cF00301B174558E7F84dC
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