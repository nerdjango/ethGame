const Token = artifacts.require("GameToken");
const Market = artifacts.require("Marketplace");

module.exports = function(deployer) {
    deployer.deploy(Market, Token.address);
};