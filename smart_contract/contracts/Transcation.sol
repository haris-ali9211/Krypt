//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction{
    uint256 transactionCounter;
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruck{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruck[] transaction;
    
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public{
        transactionCounter += 1;
        transaction.push(TransferStruck(msg.sender, receiver, amount, message, block.timestamp, keyword));
        
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransaction() public view returns(TransferStruck[] memory){
        return transaction;

    }

    function getTransactionCounter() public view returns(uint256){
        return transactionCounter;
    }
}