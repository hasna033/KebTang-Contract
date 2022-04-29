// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

contract KebTang {

    function transfer1() external payable {}

    function transfer2() external payable {}

    function transfer3() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}
