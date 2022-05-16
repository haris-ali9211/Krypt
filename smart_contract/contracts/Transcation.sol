//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction{
    uint256 transactionCounter;
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransactionStrick{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransactionStrick[] transaction;
}