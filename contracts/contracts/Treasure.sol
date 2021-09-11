// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC721 } from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { ERC721URIStorage } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import { Counters } from '@openzeppelin/contracts/utils/Counters.sol';

//Only used for rescues.
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Treasure is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  //State Storage
  bool private initialized;

  //Access Storage
  mapping(address => bool) admins;

  //Treasure Storage
  struct Game {
    bytes32 movesHash;
    uint8 level;
    uint16 achievement1; //65,000 types should be more than enough forever.
    uint16 achievement2; //If these are onchain, it can be something that future gov token...
    uint16 achievement3; //...holders can vote on later.
    bool color; //0 white, 1 black
  }

  mapping(uint256 => Game) public games;
  mapping (uint256 => address) public originalPlayers;
  mapping (bytes32 => uint) public movesHashToId;

  //Events
  event GameMinted(address to, uint256 id, string uri, bytes32 movesHash);
  event AdminAdded(address addedBy, address newAdmin);
  event AdminRemoved(address addedBy, address newAdmin);

  constructor() ERC721("Treasure Chess", "CHESS") {
    admins[msg.sender] = true;
  }

  modifier onlyAdmin() {
    require(admins[msg.sender], 'Only admins can call this function.');
    _;
  }

  function mint(
    address player,
    string memory tokenURI,
    bytes32 _moveHash,
    uint8 _level,
    uint16 _achievement1,
    uint16 _achievement2,
    uint16 _achievement3,
    bool _color
  ) public onlyAdmin returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    _setTokenURI(newItemId, tokenURI);

    Game memory newGame = Game(_moveHash, _level, _achievement1, _achievement2, _achievement3, _color);
    games[newItemId] = newGame;
    originalPlayers[newItemId] = player;
    movesHashToId[_moveHash] = newItemId; //mapping of offchain id to on chain id

    emit GameMinted(player, newItemId, tokenURI, _moveHash);
    return newItemId;
  }

  function getOriginalPlayer(uint _id) public view returns(address){
    return originalPlayers[_id];
  }

  function getTotalGames() public view returns (uint256) {
    return _tokenIds.current();
  }

  function addAdmin(address _admin) public onlyOwner {
    admins[_admin] = true;
    AdminAdded(msg.sender, _admin);
  }

  function removeAdmin(address _admin) public onlyOwner {
    admins[_admin] = false;
    AdminRemoved(msg.sender, _admin);
  }

  /*
      Rescue ERC20s and ERC721s mistakingly sent to the contract
  */
  function rescueEtherOwner(address payable to, uint256 amount) public onlyOwner {
    to.transfer(amount);
  }

  function rescueERC20Owner(address _token, address to, uint amount) public onlyOwner{

  }
}
