//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Lottery {
    address payable[] public players;
    address public owner;
    address payable public   winner;
    constructor() {
        owner = msg.sender;
        players.push(payable(owner));
    }
    modifier onlyOwner() {
        require(owner == msg.sender, "You are not the owner");
        _;
    }
    receive() external payable {
        require(msg.value == 1 ether , "Must send 1 ether amount");
        
        require(msg.sender != owner);
         players.push(payable(msg.sender));
    }
    function getBalance() public view onlyOwner returns(uint){
        return address(this).balance;
    }
    function random() internal view returns(uint){
       return uint(keccak256(abi.encodePacked(players.length)));
    }
    function pickWinner() public onlyOwner {
        require(players.length >= 3 , "Not enough players in the lottery");
      
        winner = players[random() % players.length];
        
        winner.transfer( (getBalance() * 90) / 100); 
        payable(owner).transfer( (getBalance() * 10) / 100);
        
       resetLottery(); 
        
    }
    function resetLottery() internal {
        players = new address payable[](0);
    }

}