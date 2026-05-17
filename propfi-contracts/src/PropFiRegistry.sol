// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropFiRegistry is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event PropertyRegistered(uint256 indexed tokenId, address indexed owner, string tokenURI);

    constructor(address initialOwner) ERC721("PropFi", "PROP") Ownable(initialOwner) {}

    /**
     * @dev Mints a new property NFT and assigns it to an address.
     * @param to The address that will own the minted NFT.
     * @param uri The IPFS URI containing the property metadata.
     */
    function registerProperty(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit PropertyRegistered(tokenId, to, uri);
    }
}
