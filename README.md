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

**3.** Create a file in the project root directory named .env and place the following content into it. Make sure to replace these placeholder values with the actual secrets and connection details you wish to use.
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
# with npm script
npm run compile
# with truffle
truffle compile
```

**5.** Deploy to local test network
```bash
# with npm script
npm run deploy:local
# with truffle
truffle migrate --network development
```

**6.** Deploy to kovan test network
```bash
# with npm script
npm run deploy:kovan
# with truffle
truffle migrate --network kovan
```
