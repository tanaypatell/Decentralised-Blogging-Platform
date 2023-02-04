// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC20/ERC20.sol)
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BCToken is ERC20 {
    uint256 public unitsOneEthCanBuy  = 1;
    address public tokenOwner;

    constructor() ERC20("BCTokens", "BCT") {
        _mint(msg.sender, 1000 * 10**18);
        tokenOwner = msg.sender;
    }


    function balanceOfUser(address account) public view returns (uint256) {
        return balanceOf(account)/(10**18);
    }

    function transferTo(address to, uint256 amount) external {
        amount = amount * 10**18;
        _transfer(msg.sender, to, amount);
    }

    function mint(address to, uint256 amount) private {
        require(msg.sender == tokenOwner, "Only Admin!!");
        _mint(to, amount);
    }

    // function sendViaCall(address payable _to, uint256 amount) public payable {
    //     // Call returns a boolean value indicating success or failure.
    //     // This is the current recommended method to use.
    //     // (bool sent, bytes memory data) = _to.call{value: amount}("");
    //     // require(sent, "Failed to send Ether");
    //     _to.transfer(amount);
    // }

    function burn(uint256 amount) external {
        uint256 newamount = amount * 10**18;
        //require(balanceOfUser(msg.sender) >= amount, "Insufficient Tokens.");
        //sendViaCall( payable(msg.sender), amount/unitsOneEthCanBuy);
        //payable(msg.sender).send(1 ether);
        // (bool sent, bytes memory data) = payable(msg.sender).call{value: amount}("");
        // require(sent, "Failed to send Ether");
        _burn(msg.sender, newamount);
    }

}
