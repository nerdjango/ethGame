const Token = artifacts.require("GameToken");
const Market = artifacts.require("Marketplace");

module.exports = async function(deployer) {
    let token = await Token.deployed()
    await token.mintBatch(Market.address, [1, 2, 3], [30, 20, 10], "0x00")
};