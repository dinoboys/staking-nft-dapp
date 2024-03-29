// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IRBDescriptor {
    function tokenURI(
        uint256 tokenId,
        uint256 seed
    ) external view returns (string memory);
}
