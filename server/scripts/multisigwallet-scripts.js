const main = async () => {

    // contract address 0xfDFc966C3a98c7097823adaaB22a703Ccb505Bf9
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