// TokenAirdrop.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenAirdrop is Ownable {
    IERC20 public token;

    event Airdrop(address indexed recipient, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function setToken(address _tokenAddress) external onlyOwner {
        token = IERC20(_tokenAddress);
    }

    function executeAirdrop(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Invalid input lengths");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(token.transfer(recipients[i], amounts[i]), "Airdrop failed");
            emit Airdrop(recipients[i], amounts[i]);
        }
    }

    function modifyAirdropAmount(address recipient, uint256 newAmount) external onlyOwner {
        require(token.transfer(recipient, newAmount), "Modification failed");
        emit Airdrop(recipient, newAmount);
    }
}
