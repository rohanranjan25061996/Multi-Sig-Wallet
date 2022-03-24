const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigner", function () {
  it("Should return the new greeting once it's changed", async function () {
    const MultiSigner = await ethers.getContractFactory("MultiSigner");
    const wallet = await Greeter.deploy("Hello, world!");
    await wallet.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
