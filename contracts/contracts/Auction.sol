// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { PausableUpgradeable } from '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import { Initializable } from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import { UUPSUpgradeable } from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

//Includes BaseRelayRecipient, for meta transactions.
import { ReentrancyGuardUpgradeable } from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

import { Treasure } from './Treasure.sol';

contract Auction is {

  function initialize() public initializer {
    __Ownable_init();
    __Pausable_init();
    __ReentrancyGuard_init();
  }

  struct Auction {
    uint id;
    uint startTime;
    uint endTime;
    uint minimumPrice;
    address seller;
    uint highestBid;
    address highestBuyer;
  }

  mapping (uint => Auction) auctions;

  function startAuction(uint _id, uint _startTime, uint endTime, uint minimumPrice) {
    require(_msgSender() == )
  }

  function endFailedAuction() {

  }

  function bid() {
    require()
  }




}
