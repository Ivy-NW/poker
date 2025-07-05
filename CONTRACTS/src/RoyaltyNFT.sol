// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Strings.sol";

contract RoyaltyNFT is ERC1155, Ownable {
    using Strings for uint256;

    struct Artist {
        uint256 rating; // e.g., 250 = 2.5
        uint256 investmentTarget;
        uint256 totalRoyalties;
        address artistAddress;
        string name;
        string description;
    }

    mapping(uint256 => Artist) public artists;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public artistRatings;
    uint256 public tokenCounter;

    event ArtistNFTMinted(address indexed artist, uint256 indexed tokenId, uint256 supply);

    constructor() ERC1155("") Ownable(msg.sender){
        tokenCounter = 1;
    }

    function mintArtistNFT(
        address artist,
        uint256 initialSupply,
        string memory tokenURI,
        uint256 investmentTarget,
        string memory name,
        string memory description
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = tokenCounter++;
        _mint(artist, tokenId, initialSupply, "");
        _setTokenURI(tokenId, tokenURI);

        artists[tokenId] = Artist({
            rating: 250,
            investmentTarget: investmentTarget,
            totalRoyalties: 0,
            artistAddress: artist,
            name: name,
            description: description
        });

        artistRatings[artist] = 250;

        emit ArtistNFTMinted(artist, tokenId, initialSupply);
        return tokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        _tokenURIs[tokenId] = tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function updateArtistRating(address artist, uint256 newRating) external onlyOwner {
        require(newRating >= 100 && newRating <= 500, "Invalid rating range");
        artistRatings[artist] = newRating;
    }

    function getArtistInfo(uint256 tokenId) external view returns (Artist memory) {
        return artists[tokenId];
    }
}