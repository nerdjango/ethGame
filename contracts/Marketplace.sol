// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract Marketplace is IERC1155Receiver{
    IERC1155 private _token;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;
    bytes4 private constant _INTERFACE_ID_ERC1155 = 0xd9b67a26;

    mapping(uint => uint) price;

    constructor(IERC1155 token){
        require(address(token) != address(0));
        _token = token;
        price[1]=100000000000000;
        price[2]=200000000000000;
        price[3]=300000000000000;
    }

    receive() external payable {
        buyToken(1);
    }

    function buyToken(uint token) public payable {
        uint weiAmount = msg.value;
        require(weiAmount >= price[token] && price[token] != 0);

        _token.safeTransferFrom(address(this), msg.sender, token, 1, "");
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external pure returns (bytes4){
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external pure returns (bytes4){
        return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool){
        return (interfaceId == _INTERFACE_ID_ERC165 || interfaceId == _INTERFACE_ID_ERC1155);
    }
}