// tokenAirdrop.test.js
const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");

describe("TokenAirdrop Contract", () => {
  let tokenAirdrop;
  let owner;
  let recipient1;
  let recipient2;

  before(async () => {
    [owner, recipient1, recipient2] = await ethers.getSigners();

    const TokenAirdrop = await ethers.getContractFactory("TokenAirdrop");
    tokenAirdrop = await TokenAirdrop.deploy(/* Pass token address here */);
    await tokenAirdrop.deployed();
  });

  it("should execute airdrop to multiple recipients", async () => {
    const recipients = [recipient1.address, recipient2.address];
    const amounts = [100, 200];

    await tokenAirdrop.connect(owner).executeAirdrop(recipients, amounts);

    // Add assertions to verify the state after the airdrop
    expect(await tokenAirdrop.tokenBalance(owner.address)).to.equal(/* Expected balance after airdrop */);
    expect(await tokenAirdrop.tokenBalance(recipient1.address)).to.equal(/* Expected balance after airdrop */);
    expect(await tokenAirdrop.tokenBalance(recipient2.address)).to.equal(/* Expected balance after airdrop */);
  });

  it("should modify airdrop amount for a specific recipient", async () => {
    const recipient = recipient1.address;
    const newAmount = 300;

    await tokenAirdrop.connect(owner).modifyAirdropAmount(recipient, newAmount);

    // Add assertions to verify the state after modifying the airdrop amount
    expect(await tokenAirdrop.tokenBalance(owner.address)).to.equal(/* Expected balance after modification */);
    expect(await tokenAirdrop.tokenBalance(recipient)).to.equal(/* Expected balance after modification */);
  });
});
