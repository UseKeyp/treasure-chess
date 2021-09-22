// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC721 } from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { ERC721URIStorage } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import { Counters } from '@openzeppelin/contracts/utils/Counters.sol';

//Only used for rescues.
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/// @title Treasure
/// @author Joseph Schiarizzi
/// @notice Save games of chess as NFTs
/// @dev ERC721 token
contract Treasure is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  /// @notice
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

  /// @notice
  mapping(uint256 => Game) public games;
  /// @notice
  mapping (uint256 => address) public originalPlayers;
  /// @notice
  mapping (bytes32 => uint) public movesHashToId;

  //Events
  event GameMinted(address to, uint256 id, string uri, bytes32 movesHash);
  event AdminAdded(address addedBy, address newAdmin);
  event AdminRemoved(address addedBy, address newAdmin);

  /// @notice initializes contract.
  /// @dev keep admin and owner classes seperate, but add owner as an admin to start everything off.
  constructor() ERC721("Treasure Chess", "CHESS") {
    admins[msg.sender] = true;
  }

  /// @dev
  modifier onlyAdmin() {
    require(admins[msg.sender], 'Only admins can call this function.');
    _;
  }

  /// @notice
  /// @dev
  /// @param player
  /// @param tokenURI
  /// @param _moveHash
  /// @param _level
  /// @param _achievement1
  /// @param _achievement2
  /// @param _achievement3
  /// @param _color
  /// @return
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

  /// @notice
  /// @dev
  /// @param _id
  /// @return
  function getOriginalPlayer(uint _id) public view returns(address){
    return originalPlayers[_id];
  }

  /// @notice
  /// @dev
  /// @return
  function getTotalGames() public view returns (uint256) {
    return _tokenIds.current();
  }

  /// @notice
  /// @dev
  /// @param _admin
  /// @return
  function addAdmin(address _admin) public onlyOwner {
    admins[_admin] = true;
    AdminAdded(msg.sender, _admin);
  }

  /// @notice
  /// @dev
  /// @param _admin
  /// @return
  function removeAdmin(address _admin) public onlyOwner {
    admins[_admin] = false;
    AdminRemoved(msg.sender, _admin);
  }

  /*
      Rescue ERC20s and ERC721s mistakingly sent to the contract
  */
  function rescueEtherOwner(address payable to, uint256 amount) public onlyOwner {
    (bool sent, bytes memory data) = to.call{value: amount}("");
  }

  /// @notice
  /// @dev
  /// @param _token
  /// @param to
  /// @param amount
  /// @return
  function rescueERC20Owner(address _token, address to, uint amount) public onlyOwner{

  }
}
