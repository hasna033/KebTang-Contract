// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

contract rieContract {
    string message = "Welcome to RIE system.";

    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function donate() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
