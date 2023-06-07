// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FlappyOwlToken is ERC20, ERC20Burnable, Ownable {
    //--------------------------------------------------------------------
    // VARIABLES

    using SafeMath for uint256;
    mapping(address => bool) controllers;

    //--------------------------------------------------------------------
    // ERRORS

    error FlappyOwlToken__OnlyControllersCanMint();

    //--------------------------------------------------------------------
    // CONSTRUCTOR

    constructor() ERC20("Flappy Owl Token", "FOT") {}

    //--------------------------------------------------------------------
    // FUNCTIONS

    function mint(address to, uint256 amount) external {
        if (!controllers[msg.sender])
            revert FlappyOwlToken__OnlyControllersCanMint();
        _mint(to, amount);
    }

    function burnFrom(address account, uint256 amount) public override {
        if (controllers[msg.sender]) {
            _burn(account, amount);
        }
    }

    //--------------------------------------------------------------------
    // OWNER FUNCTIONS

    function setController(
        address controller,
        bool _state
    ) external payable onlyOwner {
        controllers[controller] = _state;
    }
}
