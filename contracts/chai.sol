//SPDX-License-Identifier:MIT
pragma solidity ^0.8.10;

contract chai{
    struct memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }
    memo[] public memos;
    address payable owner;

    constructor(){
        owner=payable(msg.sender);
    }
    function buychai(string memory name,string memory message)public payable{
        require(msg.value>0,"pay more than 0 ether");
        owner.transfer(msg.value);
        memos.push(memo(name,message,block.timestamp,msg.sender));
    }

    function getmemos() public view returns(memo[] memory){
        return memos;
    }
}