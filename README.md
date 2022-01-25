# ERC-20 Test Token (ERC20T2)

💳 ERC-20 Test Token (ERC20T2) written in Solidity deployed to the Kovan testnet via Infura using Truffle.

## Prerequisites

- Node (>= 16.0.0) and npm (>= 8.0.0) can be installed from [here](https://nodejs.org/en/)
- Truffle (>= 5.0.0) can be installed from [here](https://trufflesuite.com/)
- (optional) Ganache local blockchain GUI can be installed from [here](https://trufflesuite.com/ganache/)

## Usage

**1.** Clone this repository using any git client
```bash
git clone https://github.com/NeoAren/ERC20T2.git
```

**2.** Install the dependencies using npm
```bash
npm install
```

**3.** Create a file in the project root directory named `.env` and place the following content into it. Make sure to replace these placeholder values with the actual secrets and connection details you wish to use.
```bash
# Mnemonic for your account
MNEMONIC=""
# Infura project ID
INFURA_PROJECT_ID=""
# Local development blockchain host
DEVELOPMENT_HOST="127.0.0.1"
# Local development blockchain port
DEVELOPMENT_PORT=7545
```

**4.** Compile the Solidity source code and produce ABIs
```bash
truffle compile
```

**5.** Deploy to local test network
```bash
# run latest migrations
truffle migrate --network development
# re-run all migrations
truffle migrate --network development --reset
```

**6.** Deploy to kovan test network
```bash
# run latest migrations
truffle migrate --network kovan
# re-run all migrations
truffle migrate --network kovan --reset
```

## React application

**1.** Navigate to the `./app` directory
```bash
cd app
```

**2.** Install the dependencies using npm
```bash
npm install
```

**3.** Create a file in the app directory named `.env` and place the following content into it. Make sure to replace these placeholder values with the actual secrets and connection details you wish to use.
```bash
# Address of the deployed ERC20T2 token
REACT_APP_TOKEN_CONTRACT="0x9BAD2B4726caA2948b659D0CF863C448f2e355B1"
# Address of the Uniswap V2 Router 2.0 smart contract
REACT_APP_ROUTER_CONTRACT="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
# Kovan testnet ID
REACT_APP_CHAIN_ID=42
# Suppress sourcemap generation error
GENERATE_SOURCEMAP=false
```

**4.** Start the React application
```bash
npm start
```
