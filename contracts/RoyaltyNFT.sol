// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RoyaltyNFT is ERC1155, Ownable {
    using Strings for uint256;

    // Base URI for storing metadata
    string public baseURI;

    // Struct to store artist-specific data
    struct ArtistData {
        uint256 rating; // Dynamic rating (2.5 - 5.0), scaled by 10 for precision (25-50)
        string metadataURI; // URI for artist metadata
    }

    // Mapping from token ID to artist data
    mapping(uint256 => ArtistData) public artistData;

    // Event for when an artist's rating is updated
    event ArtistRatingUpdated(uint256 indexed tokenId, uint256 newRating);
    // Event for when an NFT is minted
    event NFTMinted(uint256 indexed tokenId, address indexed owner, uint256 initialRating, string metadataURI);

    constructor(string memory _baseURI) ERC1155("") {
        baseURI = _baseURI;
    }

    // Function to set the base URI (only owner)
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    // Override uri function to provide token-specific URIs
    function uri(uint256 _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, artistData[_tokenId].metadataURI));
    }

    // Function to mint new NFTs (only owner or authorized minter)
    // Mints NFTs representing royalty rights
    function mintNFT(
        address to,
        uint256 id,
        uint256 amount,
        uint256 initialRating, // e.g., 35 for 3.5
        string memory _metadataURI,
        bytes memory data
    ) public onlyOwner { // Consider adding a MinterRole if non-owners should mint
        _mint(to, id, amount, data);
        artistData[id] = ArtistData(initialRating, _metadataURI);
        emit NFTMinted(id, to, initialRating, _metadataURI);
    }

    // Function to update artist rating (oracle or owner)
    // Visible risk metric for investors, adjustable via oracle inputs.
    // Real-time updates to reflect changes in artist performance.
    function updateArtistRating(uint256 tokenId, uint256 newRating) public onlyOwner { // Or authorized oracle
        require(newRating >= 25 && newRating <= 50, "Rating out of range (25-50)");
        artistData[tokenId].rating = newRating;
        emit ArtistRatingUpdated(tokenId, newRating);
    }

    // Function to get artist rating
    function getArtistRating(uint256 tokenId) public view returns (uint256) {
        return artistData[tokenId].rating;
    }

    // Function to get artist metadata URI
    function getArtistMetadataURI(uint256 tokenId) public view returns (string memory) {
        return artistData[tokenId].metadataURI;
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, IERC165)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
