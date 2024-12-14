// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract EthaLottery is VRFConsumerBase {
    address public manager;
    address[] public players;
    address public recentWinner;
    uint256 public lotteryEndTime;
    uint256 public ticketPrice;
    bytes32 internal keyHash;
    uint256 internal fee;
    bool public isRefunded; // Tracks if refunds were issued

    event TicketPurchased(address indexed player);
    event WinnerSelected(address indexed winner);
     event LotteryRefunded();

    constructor(
        uint256 _duration,
        uint256 _ticketPrice,
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        manager = msg.sender;
        ticketPrice = _ticketPrice;
        lotteryEndTime = block.timestamp + _duration;
        keyHash = _keyHash;
        fee = _fee;
         isRefunded = false;
    }

    function buyTicket() public payable {
        require(block.timestamp < lotteryEndTime, "Lottery has ended");
        require(msg.value == ticketPrice, "Incorrect ticket price");
        players.push(msg.sender);
        emit TicketPurchased(msg.sender);
    }

    function selectWinner() public onlyManager {
        require(block.timestamp >= lotteryEndTime, "Lottery not yet ended");
        require(players.length > 0, "No players participated");
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK for randomness");

        requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32, uint256 randomness) internal override {
        uint256 winnerIndex = randomness % players.length;
        recentWinner = players[winnerIndex];
        payable(recentWinner).transfer(address(this).balance);
        emit WinnerSelected(recentWinner);

        delete players;
        isRefunded = false;
    }

     function refundPlayers() public onlyManager {
        require(block.timestamp > lotteryEndTime, "Lottery still active");
        require(players.length > 0, "No players to refund");
        require(recentWinner == address(0), "Winner already selected");
        require(!isRefunded, "Refund already issued");

        for (uint256 i = 0; i < players.length; i++) {
            payable(players[i]).transfer(ticketPrice);
        }

        delete players;
        isRefunded = true;
        emit LotteryRefunded();
    }

    function getParticipants() public view returns (address[] memory) {
        return players;
    }

    function getLotteryStatus() public view returns (string memory) {
        if (isRefunded) return "Refunded";
        if (block.timestamp < lotteryEndTime) return "Active";
        if (recentWinner == address(0)) return "Ended (No Winner)";
        return "Ended (Winner Selected)";
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }
}
