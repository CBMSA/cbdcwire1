// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TradeContract {
    address public buyer;
    address public seller;
    uint public amount;
    bool public shipmentConfirmed;
    bool public customsCleared;

    constructor(address _seller, uint _amount) {
        buyer = msg.sender;
        seller = _seller;
        amount = _amount;
    }

    function confirmShipment() public {
        require(msg.sender == seller, "Only seller can confirm");
        shipmentConfirmed = true;
    }

    function confirmCustoms() public {
        require(shipmentConfirmed, "Shipment not confirmed yet");
        customsCleared = true;
    }

    function releasePayment() public {
        require(customsCleared, "Customs clearance pending");
        payable(seller).transfer(amount);
    }

    receive() external payable {}
}