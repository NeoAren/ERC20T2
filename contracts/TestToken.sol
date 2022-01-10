// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Custom ERC-20 implementation
contract TestToken is IERC20, IERC20Metadata, Ownable {

  // The name of the token
  string private _name = "TestToken";

  // The symbol of the token
  string private _symbol = "TST";

  // The number of decimals the token uses
  uint8 private _decimals = 18;

  // The total amount of tokens available
  uint256 private _totalSupply = 0;

  // Mapping balances to account addresses
  mapping(address => uint256) _balances;

  // Mapping allowances to account addresses;
  mapping(address => mapping(address => uint256)) _allowances;

  // Get the name of the token
  function name() external view returns (string memory) {
    return _name;
  }

  // Get the symbol of the token
  function symbol() external view returns (string memory) {
    return _symbol;
  }

  // Get the number of decimals the token uses
  function decimals() external view returns (uint8) {
    return _decimals;
  }

  // Get the total amount of tokens available
  function totalSupply() external view returns (uint256) {
    return _totalSupply;
  }

  // Get the balance of an account by its address
  function balanceOf(address account) external view returns (uint256) {
    return _balances[account];
  }

  // Transfer `amount` of tokens from the caller to `recepient`
  function transfer(address recepient, uint256 amount) external returns (bool) {
    _transfer(msg.sender, recepient, amount);
    return true;
  }

  // Check the allowance of `spender` by `owner`
  function allowance(address owner, address spender) external view returns (uint256) {
    return _allowances[owner][spender];
  }

  // Approve `spender` an allowance of `amount` tokens
  function approve(address spender, uint256 amount) external returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
  }

  // Transfer `amount` of tokens to `recipient` from `sender`
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
    require(_allowances[sender][msg.sender] >= amount, "Cannot transfer due to insufficient allowance.");
    _transfer(sender, recipient, amount);
    _allowances[sender][msg.sender] -= amount;
    return true;
  }

  // Internal function to perform approvals
  function _approve(address owner, address spender, uint256 amount) private {
    require(owner != address(0), "Cannot approve allowance from the zero address.");
    require(spender != address(0), "Cannot approve allowance to the zero address.");
    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  // Internal function to perform transfers
  function _transfer(address from, address to, uint256 amount) private {
    require(from != address(0), "Cannot transfer from the zero address.");
    require(to != address(0), "Cannot transfer to the zero address.");
    require(_balances[from] >= amount, "Cannot transfer due to insufficient balance.");
    _balances[from] -= amount;
    _balances[to] += amount;
    emit Transfer(from, to, amount);
  }

  // Mint `amount` of new tokens to address `to`
  function mint(address to, uint256 amount) public onlyOwner() {
    require(to != address(0), "Cannot mint new tokens to the zero address.");
    _totalSupply += amount;
    _balances[to] += amount;
    emit Transfer(address(0), to, amount);
  }

  // Burn `amount` of tokens from the address `from`
  function burn(address from, uint256 amount) public onlyOwner() {
    require(from != address(0), "Cannot burn tokens from the zero address.");
    require(_balances[from] >= amount, "Cannot burn tokens due to insufficient balance.");
    _totalSupply -= amount;
    _balances[from] -= amount;
    emit Transfer(from, address(0), amount);
  }

}
