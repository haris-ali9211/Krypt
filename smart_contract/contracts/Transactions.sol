//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <=0.9.0;

contract Transactions {
    uint256 transactionsCounter;
    event Transfer(address from, address to, uint amount, string message, uint timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address reciever;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addtoBlockChain(address payable reciever, uint amount, string memory message, string memory keyword) public {
           transactionsCounter += 1;
           transactions.push(TransferStruct(msg.sender,reciever,amount,message,block.timestamp, keyword));
           emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns(TransferStruct[] memory){
        return transactions;
    }
    function getTransactionCounter() public view returns(uint256){
     
        return transactionsCounter;
    }

}